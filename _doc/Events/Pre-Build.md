---
layout: doc
title: Pre-Build
permalink: /doc/Events/Pre-Build/
---
# Pre-Build event

It will be triggered when the build is started. 

## Solution-context

By default, your actions should be activated before first project at once. To be precise, it works before any build of your projects (**solution-context**). 

You should note this if you want to work with `cancel` command and similar.
(*the `cancel` can be executed only when the build is started at least for one [[?](https://github.com/3F/vsSolutionBuildEvent/issues/37)]*)

## Projects-context

*also known as `Deferred Pre-Build`*

To switch to current context you can use any from the following below:

### Execution order

`Execution order list`:

* Select one or more available projects from this list.
* Then select when it should work - `Before` / `After` build.

Now selected action should be as a deferred type for specific projects 
*(if used Pre-Build / Cancel-Build / Post-Build event types), i.e. now it will be considered in* ***projects-context.***


# References

* [Available Events](../../Events/)
* [Processing modes](../../Modes/)
* [Examples & Features](../../Examples/)
* [Solution-wide Build Events](../../Features/Solution-wide/)