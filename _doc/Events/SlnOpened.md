---
layout: doc
title: Sln-Opened
permalink: /doc/Events/SlnOpened/
---
# Sln-Opened

v0.12.7+

It will be triggered when solution has been opened. 

This especially useful for definition of new properties at runtime for your solution (to solve problems like [this]({{site.docp}}/Features/.vssbe/#unified-project-name-for-different-sln)).

For the same or similar case it can be is really easy for this event type:

* Add action for `Sln-Opened` event.
* Enable [MSBuild](../../Scripts/MSBuild/) support.
* Define what you need:

```{{site.msblang}}
$(+ProjectName = 'MyUnifiedName')
```

* Activate event and click [Apply]

Enjoy.

## Context 

[ v0.12.8+ ]

The new version provides additional contexts of `Sln-Opened` events.

**What does it mean ?** 

Working in Visual Studio IDE you may have the following cases:

* When you need to do something Before initializing projects, for example: 
    * to get (if it's not yet) git submodules when you open .sln etc.
* When you need to do something only if all projects are loaded (that should be) in IDE, for example:
    * Like above, to redefine the MSBuild properties `ProjectName` etc. for specific projects.

**How to ?** 

To support *Early / Late Sln-Opened* you should configure context:

* Select event `Sln-Opened`
* `Settings` - `Control` - `Context`:
    * `Before` - Your action should be executed only Before initializing projects.
    * `After`  - Your action should be executed only When all projects are opened in IDE.
    * `Before & After` - Your action should be executed Before initializing projects **and** When all projects are opened.

**Notes:**

* By default v0.12.8 uses `Before` context for Sln-Opened in Visual Studio IDE.
* Other products without Visual Studio ([API](../../API) -> [CI](../../CI/)) may use other behavior:
  * [CI.MSBuild](../../CI/CI.MSBuild/) uses `common` context, so it's not important Before/After like above.

### Examples

* [Restore all git submodules when opening Visual Studio IDE](../../Examples/Git/Submodules/#restore-all-git-submodules-when-opening-visual-studio-ide)


# References

* [Available Events](../../Events/)
* [Processing modes](../../Modes/)
* [Examples & Features](../../Examples/)