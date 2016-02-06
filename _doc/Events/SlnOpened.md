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

# References

* [Available Events](../../Events/)
* [Processing modes](../../Modes/)
* [Examples & Features](../../Examples/)