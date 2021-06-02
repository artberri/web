---
slug: diod-dependency-injection-typescript
date: "2021-06-02"
description: |
  Dependency injection is a recurrent pattern in complex applications, and each day it is becoming more common to see it applied with Typescript. But TS has some quirks when comparing with classic languages, like Java or C#, that we need to bear in mind. In this post, I'll talk about them and about how they pushed me to reinvent the wheel by creating a new-brand DI library: DIOD.
title: "Reinventing the wheel: DIOD (a new Typescript dependency injection library)"
resources:
- name: "featured"
  src: "images/diod.jpg"
---

The post's title is a confession; I know that there are other libraries for dependency injection with Typescript; even more, I've used them a lot, and I've learned a lot from them. [Inversify](https://github.com/inversify/InversifyJS), [tsyringe](https://github.com/microsoft/tsyringe) ..., it's thanks to all of them that I've been able to write this, but obviously, there is a motivation behind creating my own, and I'll try my best to explain it.

> ⚡️ You may end up here just looking for a dependency injection library and not on the willingness to read my explanations. Do not worry; [stop reading here and try DIOD](https://www.npmjs.com/package/diod).

## Searching for the impossible

Someone could say that dependency injection is "just a fancy way to say 'passing a parameter'"; which is a good sentence for a funny meme, but you probably know that it has more implications. Specially, you'll notice its real benefits using it together with other principles, for example, the [SOLID](https://en.wikipedia.org/wiki/SOLID) ones.

The D in SOLID it's closely related to dependency injection and refers to **dependency inversion**; this principle encourages developers to use abstractions to define dependencies in certain situations. The usual way to declare these abstractions is through interfaces, and that's what I would do with any other language, but let's see what happens with Typescript.

Imagine this simple component:

```ts
class NewsletterSender {
  public constructor(
    private readonly mailer: Mailer,
    private readonly postRepository: PostRepository
  ) {}
  
  public sendLastBlogPosts(emailTo: string): void {
    const articles = this.postRepository.getLast(5)
    const content = articles.map(a => a.toString()).join("\n\n")
    this.mailer.send(emailTo, 'My blog newsletter', content)
  }
}
```

As you can see, it depends on two other services. Following the optimum idea of using interfaces to abstract our dependencies, we could define them as:

```ts
interface Mailer {
  send(to: string, subject: string, content: string): void
}

interface PostRepository {
  getLast(limit: number): Post[]
}
```

Obviously, we will need some implementations for these abstractions also:

```ts
class MailMonkeyMailer implements Mailer {
  public send(to: string, subject: string, content: string): void {
    // Some real implementation here
  }
}

class MyDbEnginePostRepository implements PostRepository {
  public getLast(limit: number): Post[] {
    // Some real implementation here
  }
}
```

Based on this example, my ideal dependency injection library would allow us to register and use these services in a similar way to this:

```ts
container.register(Mailer).use(MailMonkeyMailer)
container.register(PostRepository).use(MyDbEnginePostRepository)
container.registerAndUse(NewsletterSender) // as an alias of container.register(NewsletterSender).use(NewsletterSender)

const newsletterSender = container.get(NewsletterSender)
newsletterSender.sendLastBlogPosts('foo@bar.com')
```

Unfortunately, this is just impossible.

## Design time VS run time

Over time, if you use Typescript, the probability of googling about using interfaces at runtime tends to one; so, I'm afraid you already know the answer: you can't. Interfaces, types, and those things that some people call syntactic sugar are not available after compiling to Javascript; therefore, they are not available at runtime.

The above classes and interfaces will result in the following compiled JS code:

```js
class NewsletterSender {
  constructor(mailer, postRepository) {
    this.mailer = mailer;
    this.postRepository = postRepository;
  }
  sendLastBlogPosts(emailTo) {
    const articles = this.postRepository.getLast(5);
    const content = articles.map(a => a.toString()).join("\n\n");
    this.mailer.send(emailTo, 'My blog newsletter', content);
  }
}
class MailMonkeyMailer {
  send(to, subject, content) {
    // Some real implementation here
  }
}
class MyDbEnginePostRepository {
  getLast(limit) {
    // Some real implementation here
  }
}
```

As you can see, there is no trace of the interfaces, and, because of this reason, most existing DI libraries offer a string-based or symbol-based solution, which is an approach that I don't like. The relations between those symbols or strings and their corresponding interfaces are weak and based on conventions; thus, they are error-prone and hinder refactoring.

The best alternative is to use abstract classes. This highly opinionated assertion will probably cause reluctance to many people; but, a pure TS abstract class will be available at runtime and will allow auto wiring with constructor-based dependency injection. Although you can think that this approach could introduce inheritance problems, it won't; take into account that what I am suggesting is to implement and not extend these abstract classes.

By making this change, our new abstractions will look like this (the rest of the code will remain the same):

```ts
abstract class Mailer {
  abstract send(to: string, subject: string, content: string): void
}

abstract class PostRepository {
  abstract getLast(limit: number): Post[]
}
```

Regrettably, this is not enough.

## Decorators: a necessary evil

We have managed to have some runtime constructs for the abstractions of our class collaborators by using abstract classes instead of interfaces; but, there is still a problem: the compiled Javascript isn't relating those abstractions with the constructor parameters.

Typescript provides a [single official way](https://www.typescriptlang.org/docs/handbook/decorators.html#metadata) to expose data about the typings in the final compiled code; it consists of decorators with the `experimentalDecorators` and the `emitDecoratorMetadata` compiler options activated.

Finally, our example code will be:

```ts
@SomeDecorator()
class NewsletterSender {
  // ...
}

// ...
```

And the final compiled code:

```js
// here some auto-generated helpers like __decorate or __metadata
class Mailer {
}
class PostRepository {
}
let NewsletterSender = class NewsletterSender {
    constructor(mailer, postRepository) {
        this.mailer = mailer;
        this.postRepository = postRepository;
    }
    sendLastBlogPosts(emailTo) {
        const articles = this.postRepository.getLast(5);
        const content = articles.map(a => a.toString()).join("\n\n");
        this.mailer.send(emailTo, 'My blog newsletter', content);
    }
};
NewsletterSender = __decorate([
    SomeDecorator(),
    __metadata("design:paramtypes", [Mailer,
        PostRepository])
], NewsletterSender);
class MailMonkeyMailer {
    send(to, subject, content) {
        // Some real implementation here
    }
}
class MyDbEnginePostRepository {
    getLast(limit) {
        return [];
    }
}
```

If you examine the generated code shown above, you will see that now it has enough information to implement the ideal library that I was thinking about in the first section of this post. Still, I will theorize about one thing more.

If you apply the dependency inversion principle to a layered architecture, you will end up with what is call [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) (or Ports & Adapters). This kind of architecture tries to keep the core of your applications decoupled from your infrastructure or concrete dependencies, which also means that it should not be aware of your inversion-of-control container or your dependency injection tool. It is hard to accomplish with the currently existing libraries because most of them require you to use their decorators on every service, including those in the inner layers of your app. My ideal library will allow users to use their own.

## The new wheel: DIOD

[DIOD](https://github.com/artberri/diod) is the new Dependency Injection library that I created for Typescript (Node.js or Browser) that has some unique features that are difficult (if not impossible) to be found in other libraries:

- Dependencies will be auto wired based on constructor types exclusively; so, it will accept only abstract or concrete classes as constructor types.
- The functionality will never be compromised by the use of the decorators provided by the library. Main features will be available using decorators created by the user to avoid vendor-locking and coupling.

Apart from those special ones, it also provides the following features out-of-the-box:

- Lightweight: It will be always dependency-free and under 2kB
- Factory services: Using a factory to create services.
- User provided services: Using a manually created instance to define a service.
- Scope: By default every service is transient, but they can be registered as singletons or as 'per request' (the same service instance will be used within a single request).
- Compiler: After all needed services are registered, the container needs to be built. During this build, DIOD will check for errors like missing dependencies, wrong configurations, or circular dependencies.
- Visibility: Services can be marked as private. Private services will be available only as dependencies and they will not be able to be queried from the IoC container.
- Tagging: Ability to tag services in the container and to query services based on tags.
- Support for vanilla JS: Usage with vanilla Javascript is possible by manually defining service dependencies.

Take a look at it in the [NPM Registry](https://www.npmjs.com/package/diod) or in [Github](https://github.com/artberri/diod). Do not hesitate to tell me your opinion about it, and to star it on Github if you like or use it. I'll be very grateful.
