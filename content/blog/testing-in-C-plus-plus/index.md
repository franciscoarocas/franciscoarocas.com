---
title: Testing in C++
date: "2020-12-11T17:44:00.284Z"
description: "How to create unit testing in C++"
---

We use Unit Testing to create a good design in our projects. As an example, I use Jest in Javascript and RSpect in Ruby, but how can we create tests using C++.

Here a solution. First of all, you need to use a Linux Distribution. If you are using Windows, you can download Linux using the Linux subsystem, or download a tool which emulates a Linux Operative System.

Now, you need to download and install this:

~~~bash
sudo apt-get install libgtest-dev
~~~

After installing it, you need to compile the code to create the necessary library files:

~~~bash
sudo apt-get install cmake
cd /usr/src/gtest
sudo cmake CMakeLists.txt
sudo make
~~~

Now its time to create the testing files, but before all, we create a simple C++ program:

