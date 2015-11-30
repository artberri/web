require "rubygems"
require 'html/proofer'

desc "Lint project"
task :lint do
  lintBuildPid = Process.spawn("grunt lint")

  trap("INT") {
    [lintBuildPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [lintBuildPid].each { |pid| Process.wait(pid) }
end

desc "Build project"
task :build do
  gruntBuildPid = Process.spawn("grunt build")

  trap("INT") {
    [gruntBuildPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [gruntBuildPid].each { |pid| Process.wait(pid) }
end

desc "Test project"
task :test do
  opts = { :disable_external => true }
  HTML::Proofer.new("./_site", opts).run
end

task :default => [:lint, :build, :test]
