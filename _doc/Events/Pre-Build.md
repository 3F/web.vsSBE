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

To switch to current context you can use any from the following below.

### Execution order

`Execution order list`:

* Select one or more available projects from this list.
    * 'OR logic' between all records: if you select 2 or more project in list, the action should be executed once for any from this.
* Then select when it should work - `Before` / `After` build.

Now selected action should be as a deferred type for specific projects*, i.e. now it will be considered in* ***projects-context.***

#### First / Last Project

[v0.12.10+]

You can also select special types:

* `:?: First Project` - Any first project of build. 
    * *Available if you have 1 or more loaded projects in your solution.*
* `:?: Last Project` - Any last project of build. 
    * *Available if you have 2 or more loaded projects in your solution.*
* `:?: First Type` - Any first 'Before' / 'After' type.
    * *Available if you have 2 or more loaded projects in your solution.*
* `:?: Last Type` - Any last 'Before' / 'After' type. 
    * *Available if you have 2 or more loaded projects in your solution.*

```
equality of logic for v0.12.10+

:?: First Project (Before) == :?: First Type (Before)
                         ~ == :?: First Type (After)
:?: First Project (After)  == ~
:?: Last Project (Before)  == :?: Last Type (Before)
:?: Last Project (After)   == ~
                         ~ == :?: Last Type (After)
```

Sample:

```
Rebuild:

  'Conari'(:?: First Project/:?: First Type):Before
  'UnLib'(/):Before
  'GenDelegates'(/):Before
  'GenDelegates'(/:?: First Type):After
  'Conari'(:?: First Project/):After
  'LunaRoad'(/):Before
  'LunaRoad'(/):After
  'LunaRoadTest'(/):Before
  'LunaRoadTest'(/):After
  'UnLib'(/):After
  'ConariTest'(:?: Last Project/:?: Last Type):Before
  'ConariTest'(:?: Last Project/:?: Last Type):After

Build:

  'Conari'(:?: First Project/:?: First Type):Before
  'Conari'(:?: First Project/:?: First Type):After
  'UnLib'(/):Before
  'UnLib'(/):After
  'GenDelegates'(/):Before
  'GenDelegates'(/):After
  'LunaRoad'(/):Before
  'ConariTest'(/):Before
  'ConariTest'(/):After
  'LunaRoad'(/):After
  'LunaRoadTest'(:?: Last Project/:?: Last Type):Before
  'LunaRoadTest'(:?: Last Project/:?: Last Type):After
```

# References

* [Available Events](../../Events/)
* [Processing modes](../../Modes/)
* [Examples & Features](../../Examples/)
* [Solution-wide Build Events](../../Features/Solution-wide/)