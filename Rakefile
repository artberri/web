require "rubygems"
require 'html/proofer'

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
  HTML::Proofer.new("./_site").run
end

task :default => [:build, :test]
