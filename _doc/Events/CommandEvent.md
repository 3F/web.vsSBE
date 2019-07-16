---
layout: doc
title: CommandEvent. EnvDTE
permalink: /doc/Events/CommandEvent/
---
# CommandEvent (DTE)

This can be used for catching of the command events from your VS IDE.

{% assign infoData = "For advanced work with all commands beyond of the solution level, use the [vsCommandEvent](http://vsce.r-eg.net/doc/Modes/EnvCommand/)" %}
{% include elem/info %}

Also available Sniffer as helper for listening all commands from EnvDTE:

![Sniffer](../../Resources/examples/CommandEvent.gif)

Find and add all what you want, configure it after, then use with [available modes](../../Modes/).

## Get the last command

You can use [DTEComponent](../../Scripts/SBE-Scripts/Components/DTEComponent/) of [SBE-Scripts](../../Scripts/SBE-Scripts/) core.

Samples:

```{{site.sbelang}}
$(lcGuid = #[DTE events.LastCommand.Guid])
$(lcId   = #[DTE events.LastCommand.Id])

#[($(lcGuid) == "{1496A755-94DE-11D0-8C3F-00C04FC2AAE2}" && $(lcId) == 1627) {
    #[File scall("notepad", "#[var log]", 30)]
}]
```

or you can use [C# Mode](../../Modes/CSharp/) etc.

# References

* [Available Events](../../Events/)
* [Processing modes](../../Modes/)
* [Examples & Features](../../Examples/)