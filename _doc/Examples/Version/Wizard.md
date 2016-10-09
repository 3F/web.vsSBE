---
layout: doc
title: Wizard - Automatic Version Numbering
permalink: /doc/Examples/Version/Wizard/
---
# Wizard - Automatic Version Numbering

*Automatic code generation*

![Wizard]({{site.docp}}/Resources/examples/wizard/version/type.png)

The current code generation wizard is available for {% assign lnkT = "v0.12.5+" %}{% include elem/vsixlatest %}

# How to

Open wizard from `Settings` - `Wizards` - `Automatic Version Numbering` and choose type of generation.

What available:

* C# Struct
* C++ Struct
* C++ macro definitions ( #define )
* Direct replacement

Configure all required fields for each steps and move to final by pressing `Next step`

![Configuring of C++ struct]({{site.docp}}/Resources/examples/wizard/version/struct.png)

`...`

After the all required steps for selected type you will see final script for [SBE-Scripts engine]({{site.docp}}/Scripts/SBE-Scripts/):

![Wizard - final script for SBE-Scripts]({{site.docp}}/Resources/examples/wizard/version/final.png)

That's all. 

The final complex script should be evaluated with [our engine]({{site.docp}}/Scripts/SBE-Scripts/), so simply add new action and smile :)

*You can create new action immediatly from this by clicking on `Create Action`*

# References

* [Manually variant](../Manually/)
* [SBE-Scripts]({{site.docp}}/Scripts/SBE-Scripts/)
* [Visual Studio Gallery page](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/)
* [Examples & Features]({{site.docp}}/Examples/)
