---
slug: decoupling-from-framework
date: "2019-05-28"
description: |
  The javascript framework war that we are seeing today is harder than the one we've seen in the Game of Thrones series. To choose the proper framework is one of the most important decisions we need to take when starting a new project and that's why there are hundreds of posts on the internet comparing frameworks: reactivity, extensibility, adoption... This is not one of those posts.
title: Decoupling an SPA from the framework
language: es
resources:
- name: "featured"
  src: "images/framework-war-og.png"
---

The aim of this post is to encourage you to avoid coupling your application to the framework you choose.
By doing it you will be able to switch your framework quite easy, which is probably not a common task,
but it will help you update it to a new version with very low effort also. Apart from that, a huge advantage
will be that it will let you test your application logic without depending on the view.

In order to illustrate how we can achieve it, I've created [a repository](https://github.com/artberri/todomvp)
that implements the famous [TodoMVC](http://todomvc.com/)
app using the MVP pattern to decouple from the framework. To demonstrate how decoupled it is it includes
three implementations that use the same core code: [Angular](https://angular.io/), [React](https://reactjs.org/)
and [Vue](https://vuejs.org/).

I apologize to the pure javascript lovers, I've chosen Typescript to do the job. I've been working with it
recently, I love some of its benefits and it helps me following an OO approach. Anyway, a similar way could
be followed by using vanilla JS. And remember, this is just my point of view,  It's not evidence ;)

## Model-View-Presenter

Wikipedia defines <abbr title="Model-View-Presenter">MVP</abbr> as a design pattern that facilitates automated
unit testing and improves the separation of concerns in presentation logic, and I won't define it better.

The presenter will be in the middle, receiving the user actions from the view and mutating the data from the model,
or receiving the data from the model and formatting it to present in the view.

<center>
![Screenshot with network speeds](images/Model_View_Presenter_GUI_Design_Pattern.png)
</center>

But this is a practical article, if you want more theoretical and interesting readings about the MVP or other design
patterns, you can take a look at these articles by [Martin Fowler](http://www.martinfowler.com/eaaDev/uiArchs.html),
[Derek Greer](http://www.aspiringcraftsman.com/2007/08/25/interactive-application-architecture/) or
[Addy Osmany](https://addyosmani.com/blog/understanding-mvc-and-mvp-for-javascript-and-backbone-developers/).

## The View

Its only responsibility is to show the data that the presenter is sending and to forward the user action events
to the presenter. For us, it will be an interface that will define the view behavior and that will be implemented
by the chosen framework. A good approach is to create a view for each component, as an example, we will take the
'TodoItem' component as an example for the whole post.

{{< highlight typescript >}}
import { Todo } from '../model';

export interface ITodoUserActions {
  onDoubleClicked(): void;
  onToggleCheckboxClicked(): void;
  onRemoveButtonClicked(): void;
  onInputBlur(inputContent: string): void;
}

export interface ITodoView extends ITodoUserActions {
  todo: Todo;
  setEditMode(): void;
  setViewMode(): void;
  completeTodo(): void;
  activateTodo(): void;
}
{{< / highlight >}}

There are different approaches when implementing the view, I prefer to use the
[Passive View](https://martinfowler.com/eaaDev/PassiveScreen.html) pattern and let the presenter control it
entirely. In this case, I'm defining an input Todo, some user events, and some explicit methods to change the
view. Those methods shouldn't have any logic but UI.

## The presenter

It's our orchestra conductor. Its responsibility is to make the proper changes in the model in response to
the user actions and to get the proper data depending on the view.

{{< highlight typescript >}}
export abstract class BasePresenter<V> {
  protected _view!: V;

  protected get view(): V {
    return this._view;
  }

  protected abstract init(): void;

  public attach(view: V): void {
    this._view = view;
    this.init();
  }
}
{{< / highlight >}}

All the presenters of the application extend this base class. As you can see it completely couples the presenter
to a view, but this is the way it should work: <nobr>1 view <-> 1 presenter</nobr>, and each presenter will control just one
component. Let's take a look at the todo.presenter.ts:

{{< highlight typescript >}}
import { Service, BasePresenter, Mediator } from '../framework';
import { ITodoView } from '../views';
import { AppState, ToggleTodoCommand, RemoveTodoCommand, EditTodoCommand } from '../model';

@Service()
export class TodoPresenter extends BasePresenter<ITodoView> {
  constructor(
    private readonly state: AppState,
    private readonly mediator: Mediator
  ) {
    super();
  }

  protected init(): void {
    this.view.setViewMode();
    this.state.subscribe(() => {
      this.view.todo.isCompleted ? this.view.completeTodo() : this.view.activateTodo();
    });
  }

  public editTodo(title: string): void {
    this.mediator.send(new EditTodoCommand({
      todo: this.view.todo,
      title
    }));
    this.view.setViewMode();
  }

  public removeTodo(): void {
    this.mediator.send(new RemoveTodoCommand(this.view.todo));
  }

  public toggleTodo(): void {
    this.mediator.send(new ToggleTodoCommand(this.view.todo));
  }

  public setEditMode(): void {
    this.view.setEditMode();
  }
}
{{< / highlight >}}

As you can see there is more or less a method for each user action defined in the view, and that's all
the logic that the view should implement. In fact, we can define an abstract implementation of the
view that sets the contract with the presenter. In my case I have implemented it in the form of
a Typescript mixin:

{{< highlight typescript >}}
import { Type, Injector } from '../framework';
import { ITodoUserActions } from './todo.view';
import { TodoPresenter } from '../presenters';

// tslint:disable-next-line:typedef
export function TodoMixin<TBase extends Type>(base: TBase) {
  return class extends base implements ITodoUserActions {
    public presenter: TodoPresenter = Injector.resolve(TodoPresenter);

    public onDoubleClicked(): void {
      this.presenter.setEditMode();
    }

    public onToggleCheckboxClicked(): void {
      this.presenter.toggleTodo();
    }

    public onRemoveButtonClicked(): void {
      this.presenter.removeTodo();
    }

    public onInputBlur(inputContent: string): void {
      this.presenter.editTodo(inputContent);
    }
  };
}
{{< / highlight >}}

Looking deep into the presenter we won't see much logic there either, this is because I tried to isolate
the model of my application in a FLUX/REDUX like architecture. I've created my own system because I wanted
to make it dependency free, but you can use some common library, like redux itself, to implement it. The aim
of using a mediator or a task dispatcher is also to isolate the application use cases from the way we represent
them. In the same way I've created my own dependency injector, but probably it will be worth to use
Inversify or other similar instead.

The basic principle of what I did in every presenter is to subscribe to the application state in every view
initialization in order to update it accordingly and to wrap any query or command sent to the model by using
a mediator.

## The model

In our case, the model will define the data of the application, the repository or the store we are
going to use (or at least its interface) and the use cases. Taking into account our previous example
I'll show you a couple of the actions and the Todo state container:

{{< highlight typescript >}}
import { CommandHandler, Service } from '../../../../framework';
import { EditTodoCommand, IEditTodoPayload } from '../edit-todo.command';
import { TodosState } from '../../../state';

@Service()
export class EditTodoCommandHandler extends CommandHandler<IEditTodoPayload> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(EditTodoCommand);
  }

  public handle(payload: IEditTodoPayload): void {
    this.todosState.edit(payload.todo, payload.title);
  }
}
{{< / highlight >}}

{{< highlight typescript >}}
import { CommandHandler, Service } from '../../../../framework';
import { ToggleTodoCommand } from '../toggle-todo.command';
import { TodosState } from '../../../state';
import { Todo } from '../../../domain';

@Service()
export class ToggleTodoCommandHandler extends CommandHandler<Todo> {
  constructor(
    private readonly todosState: TodosState
  ) {
    super(ToggleTodoCommand);
  }

  public handle(todo: Todo): void {
    this.todosState.toggle(todo);
  }
}

{{< / highlight >}}

{{< highlight typescript >}}
import { Todo } from '../../model';
import { Service, StateContainer } from '../../framework';

@Service()
export class TodosState extends StateContainer<Todo[]> {
  constructor() {
    super([]);
  }

  public initialize(todos: Todo[]): void {
    this.setState(todos);
  }

  public clearCompleted(): void {
    this.setState(this.state.filter(todo => todo.isCompleted === false));
  }

  public remove(todo: Todo): void {
    this.setState(this.state.filter(t => t !== todo));
  }

  public add(todo: Todo): void {
    this.setState([
      ...this.state,
      todo
    ]);
  }

  public completeAll(): void {
    const areAllMarked = this.state.every(todo => todo.isCompleted);
    this.setState(this.state.map(todo => {
      areAllMarked ? todo.activate() : todo.complete();
      return todo;
    }));
  }

  public toggle(todo: Todo): void {
    this.setState(this.state.map(t => {
      if (t === todo) {
        t.isCompleted ? t.activate() : t.complete();
      }
      return t;
    }));
  }

  public edit(todo: Todo, newTitle: string): void {
    this.setState(this.state.map(t => {
      if (t === todo) {
        t.setTitle(newTitle);
      }
      return t;
    }));
  }
}

{{< / highlight >}}

It seems clear what they do, doesn't it? I'm not going to go deeper on how I implemented the state
container and its reactivity, you can check the repo code if you are curious or you can just use
a better-tested tool like redux.

What is important to know also is that you shouldn't depend on the framework or in any concrete implementation
to persist or retrieve any data. It's your model who should define an interface that should be implemented
depending on the framework or the service you will reach. This is what I defined:

{{< highlight typescript >}}
import { Todo } from '../entities';

export abstract class TodoStorageService {
    public abstract getTodos(): Todo[];
    public abstract saveTodos(todos: Todo[]): void;
}

{{< / highlight >}}

And it is my main app component the one who will be in charge of retrieving the data on the application start 
and to save it on any state change:

{{< highlight typescript >}}
import { Service, BasePresenter, Mediator } from '../framework';
import { AppState, LoadTodosCommand, SaveTodosCommand, GetAllTodosQuery, ContainsAnyTodosQuery } from '../model';
import { IAppView } from '../views';

@Service()
export class AppPresenter extends BasePresenter<IAppView> {
  constructor(
    private readonly mediator: Mediator,
    private readonly state: AppState
  ) {
    super();
  }

  protected init(): void {
    this.mediator.send(new LoadTodosCommand());
    this.state.subscribe(() => {
      this.mediator.send(new SaveTodosCommand(this.mediator.send(new GetAllTodosQuery())));
      this.mediator.send(new ContainsAnyTodosQuery()) ? this.view.showList() : this.view.hideList();
    });
  }
}
{{< / highlight >}}

## Testing

Now, even I didn't write any HTML line yet, I'll be able to test the whole functionality of my
component by mocking the view. It's not an end to end test and it will not test the way the data
is displayed, but it will cover a great part of the error-prone side of the application.
Here you can see a little fragment of the todo.presenter.spec.ts file:

{{< highlight typescript >}}
    describe('On toggle checkbox clicked', () => {
      describe('when it is initially active', () => {
        beforeEach(() => {
          view.todo = activeTodo;
          presenter.attach(view);
          jest.clearAllMocks();
        });

        test('completes the todo', () => {
          presenter.toggleTodo();

          expect(todosState.state[0].isCompleted).toBe(true);
        });

        test('checks the checkbox', () => {
          presenter.toggleTodo();

          expect(view.completeTodo).toHaveBeenCalled();
        });
      });
    });
{{< / highlight >}}

For this project, I've just tested the presenters, but you can make also small unit tests covering just the user actions in the model.

## The framework implementation

I didn't talk about any framework yet, but now, I want you to see how easy and similar it is to implement
this TodoItem component with any framework that you can choose.

### Angular

{{< highlight typescript >}}
import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Todo, TodoMixin, ITodoView, TodoPresenter, Injector } from '../../../../../app/src';
import { BaseView } from 'src/app/base.view';

@Component({
  selector: '[app-todo]',
  templateUrl: 'todo.template.html',
  styles: []
})
export class TodoComponent extends TodoMixin(BaseView) implements ITodoView, OnInit {
  @Input()
  public todo: Todo;

  @HostBinding('class.completed')
  public isCompleted: boolean = false;

  @HostBinding('class.editing')
  public isEditing: boolean = false;
  public todoTitleInput: string;

  public readonly presenter: TodoPresenter = Injector.resolve(TodoPresenter);

  public ngOnInit(): void {
    this.presenter.attach(this);
    this.todoTitleInput = this.todo.title
  }

  public setEditMode(): void {
    this.isEditing = true;
  }

  public setViewMode(): void {
    this.isEditing = false;
  }

  public completeTodo(): void {
    this.isCompleted = true;
  }

  public activateTodo(): void {
    this.isCompleted = false;
  }
}
{{< / highlight >}}

{{< highlight html >}}
<div class="view">
  <input class="toggle"
         type="checkbox"
         [checked]="isCompleted"
         (click)="onToggleCheckboxClicked()">
  <label (dblclick)="onDoubleClicked()">{{ todo.title }}</label>
  <button class="destroy" (click)="onRemoveButtonClicked()"></button>
</div>
<input [(ngModel)]="todoTitleInput"
      class="edit"
      (blur)="onInputBlur(todoTitleInput)"
      (keyup.enter)="onInputBlur(todoTitleInput)">
{{< / highlight >}}

### React

{{< highlight tsx >}}
import React, { Component, KeyboardEvent, ChangeEvent } from 'react';

import { ITodoView, Injector, TodoMixin, TodoPresenter, Todo } from '../core';

interface ITodoItemProps {
  todo: Todo;
};

interface ITodoItemState {
  isEditing: boolean;
  isCompleted: boolean;
  todoTitleInput: string;
};

export default class TodoItem extends TodoMixin(Component)<ITodoItemProps, ITodoItemState> implements ITodoView {
  public readonly presenter: TodoPresenter = Injector.resolve(TodoPresenter);
  private isUmounting: boolean = false;

  public get todo(): Todo {
    return this.props.todo;
  }

  public get todoTitleInput(): string {
    return this.state ? this.state.todoTitleInput : this.props.todo.title;
  }

  public get isEditing(): boolean {
    return this.state ? this.state.isEditing : false;
  }

  public get isCompleted(): boolean {
    return this.state ? this.state.isCompleted : false;
  }

  public setEditMode(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isEditing: true
    });
  }

  public setViewMode(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isEditing: false
    });
  }

  public completeTodo(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isCompleted: true
    });
  }

  public activateTodo(): void {
    if (this.isUmounting) {
      return;
    }
    this.setState({
      isCompleted: false
    });
  }

  public onKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      this.onInputBlur(this.todoTitleInput);
    }
  }

  public onChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({
      todoTitleInput: event.target.value
    });
  }

  public componentDidMount():void {
    this.presenter.attach(this);
    this.setState({
      todoTitleInput: this.props.todo.title
    });
  }

  public componentWillUnmount(): void {
    this.isUmounting = true;
  }

  render() {
    let liClasses = '';
    liClasses += this.isCompleted ? ' completed' : '';
    liClasses += this.isEditing ? ' editing' : '';

    return (
      <li className={liClasses}>
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={this.isCompleted}
                 onChange={() => {}}
                 onClick={() => this.onToggleCheckboxClicked()} />
          <label onDoubleClick={() => this.onDoubleClicked()}>{ this.todo.title }</label>
          <button className="destroy" onClick={() => this.onRemoveButtonClicked()}></button>
        </div>
        <input className="edit"
               value={this.todoTitleInput}
               onChange={event => this.onChange(event)}
               onBlur={() => this.onInputBlur(this.todoTitleInput)}
               onKeyDown={event => this.onKeyDown(event)} />
      </li>
    )
  }
}
{{< / highlight >}}

### Vue

{{< highlight html >}}
<template>
  <li :class="{ 'completed': isCompleted, 'editing': isEditing }">
    <div class="view">
      <input class="toggle" type="checkbox" :checked="isCompleted" v-on:click="onToggleCheckboxClicked()">
      <label v-on:dblclick="onDoubleClicked()">{{ todo.title }}</label>
      <button class="destroy" v-on:click="onRemoveButtonClicked()"></button>
    </div>
    <input class="edit" v-model="todoTitleInput" v-on:blur="onInputBlur(todoTitleInput)" v-on:keyup.enter="onInputBlur(todoTitleInput)" />
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Todo, ITodoView } from '../../../app/src';
import { VueTodoMixin } from '../mixins';

@Component({
  mixins: [VueTodoMixin]
})
export default class TodoItem extends VueTodoMixin implements ITodoView {
  @Prop()
  public todo!: Todo;

  public isCompleted: boolean = false;
  public isEditing: boolean = false;
  public todoTitleInput: string = '';

  public created(): void {
    this.presenter.attach(this);
    this.todoTitleInput = this.todo.title;
  }

  public setEditMode(): void {
    this.isEditing = true;
  }

  public setViewMode(): void {
    this.isEditing = false;
  }

  public completeTodo(): void {
    this.isCompleted = true;
  }

  public activateTodo(): void {
    this.isCompleted = false;
  }
}
</script>
{{< / highlight >}}

Looking at the three together I expect that you will be able to see how I was able to implement it
without worrying about the framework. Of course, the templating or the state management of each one
is quite different, but it's just a matter of adapting them to our presenter.

[My todomvp repository](https://github.com/artberri/todomvp) holds the full implementation of the
TodoMVC app with the three frameworks, not just the TodoItem component. Check it if you want and poke me on
Twitter or by email if you have some doubts or if you found any issue.

Use the framework and don't be used by it.
