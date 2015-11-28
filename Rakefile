require "rubygems"

desc "Build project"
task :build do
  gruntBuildPid = Process.spawn("grunt build")

  trap("INT") {
    [gruntBuildPid].each { |pid| Process.kill(9, pid) rescue Errno::ESRCH }
    exit 0
  }

  [gruntBuildPid].each { |pid| Process.wait(pid) }
end

task :default => [:build]
