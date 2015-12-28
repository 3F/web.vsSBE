---
layout: doc
title: Create component for SBE-Scripts core in 5min.
permalink: /doc/Dev/New Component/
---

# Create component for SBE-Scripts core in 5min.

***For a quick lexical analysis*** *of properties and methods, you can use* ***our [IPM analyzer](../SBE-Scripts/IPM/)*** - *It allows to quickly prepare for semantic analysis all of what you want...*

All components should implement the **[IComponent](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs)** interface.

Also available abstract [Component](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) for rapid implementation of all new features. The [Component](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) is already contains basic behaviours with available data. Therefore, create the new component is really easy.

## DemoComponent

Let's try to create new 'DemoComponent' step by step.

All components should have postfix **Component** as part of name, for example: MathComponent

* Add new class in path `/SBEScripts/Components/DemoComponent.cs`

```csharp 

public class DemoComponent: Component, IComponent
{

}
```

With [Component](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) we have already implemented requirements of [IComponent](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs), therefore we'll implement only own logic.

### Identifier of new container

Firstly, we should set identifier of your container from new component.

And for basic checking of ability work with data we can simply:

```csharp 

public override string Condition
{
    get { return "Demo "; }
}
```

*Use [CRegex](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs) flag if need a complex condition with regex pattern ( [IgnorePatternWhitespace](http://msdn.microsoft.com/en-us/library/system.text.regularexpressions.regexoptions.aspx) used by default)*

```csharp 
public override string Condition
{
    get { return "^Build projects\\..+"; } // additional handling for already existing component:
}
```
```csharp 
public override string Condition
{
    get { return @"(?:Demo|Alias)\s"; } // alias for Demo word
}
```

### Logic of user code

Now you should implement `parse(string data)` with what you want:

```csharp 

public override string parse(string data)
{
    // TODO
}
```

**For example**, we'll implement `int add(int a, int b)` method, sample:

```java 

#[Demo add(1, 2)]
```

For this case you can use **our [IPM analyzer](../SBE-Scripts/IPM/)** to parse this signature.

However, you can also use the regular expression as a custom variant of implementation or you can use anything else with what you like...

### Final code of DemoComponent

The final **full source code** of your DemoComponent can be, **for example**:

```csharp 
using net.r_eg.vsSBE.SBEScripts.Exceptions;
using net.r_eg.vsSBE.SBEScripts.SNode;

namespace net.r_eg.vsSBE.SBEScripts.Components
{
    public class DemoComponent: Component, IComponent
    {
        public override string Condition
        {
            get { return "Demo "; }
        }

        public override string parse(string data)
        {
            var point       = entryPoint(data);
            string subtype  = point.Key;
            string request  = point.Value;

            IPM pm = new PM(request);

            if(pm.FinalEmptyIs(0, LevelType.Method, "add"))
            {
                ILevel level = pm.Levels[0]; // root element

                level.Is("int add(int a, int b)", ArgumentType.Integer, ArgumentType.Integer);
                int a = (int)level.Args[0].data;
                int b = (int)level.Args[1].data;

                return Value.from(a + b);
            }

            throw new OperationNotFoundException("'{0}' is not yet supported", request);
        }
    }
}
```

*it will work with `int add(int a, int b)` in user code via [IPM analyzer](../SBE-Scripts/IPM/).*

**Note:** 

* The [FunctionComponent](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/FunctionComponent.cs) is recent and most simple component with IPM using. Use this for common develop.
* The [SevenZipComponent](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/SevenZipComponent.cs) is recent IPM component with complex different signatures to help with develop.

### Bootloader. Register new component

Then, with default [Bootloader](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Bootloader.cs) to register new component, use for example:

```csharp 

bootloader.register(new DemoComponent());
```

#### Custom Bootloader

You can also use own Bootloaders with implementing [IBootloader](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/IBootloader.cs) or simply override [Bootloader.register()](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Bootloader.cs):

```csharp
protected override void register()
{
    ...
    register(new DemoComponent());
}
```

To initialize new instance of SBE-Scripts core, use for example:

```csharp
new Script(new BootloaderCustom())
```

### Result

That's all. Build and Run vsSBE, open `Tools` - `SBE-Scripts` and try to execute:

```java
#[Demo add(7, 5)]
```

Congratulation! The DemoComponent has been implemented.

What's next ? how to implement a more complex logic and how to work with MSBuild engine, User-Variables, etc., you can look on [real components](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEvent/SBEScripts) (Please note, some older components still may use old syntax before using new [IPM](../SBE-Scripts/IPM/))

Also, if you want share your component for current project - use pull request (on Bitbucket or GitHub), or send directly as .patch file with available contacts.

## How about plugin system for this ?

Currently it's for internal structures, mainly. *It can be later, because it's really useful or convenient at least.*

**But**, today this was not necessary for our users. Otherwise, you should [create](https://bitbucket.org/3F/vssolutionbuildevent/issues/new) issue and **vote** for this - we'll look it as demand among users.

Also, **as variant** you **already** can see available:

* [C# Mode](../../Modes/CSharp/) as equivalent for your actions at runtime. *+Access to [scripts engines](../../Scripts/), including [SBE-Scripts](../../Scripts/SBE-Scripts/).*
* Use [API](../../API/) level.
    * The [client.vssbe.dll](../../API/#client-vssbe-dll) as part of [API](../../API/) for work with events from our core library.


## Have a question ?

If you have a question or have a some problem with creating of new component and similar, just [create new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new)

# References

* [IPM analyzer](../SBE-Scripts/IPM/)
* [Dom & Code Completion](../SBE-Scripts/Dom/)
* Interface [IComponent](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs)
* abstract  [Component](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs)
* [Bootloader](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Bootloader.cs) ([IBootloader](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/IBootloader.cs))
* [Existing components](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEvent/SBEScripts/Components) - **Please note**, some older components still may use old syntax before using new [IPM](../SBE-Scripts/IPM/)
    * Recents with IPM using:
        * [FunctionComponent](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/FunctionComponent.cs)
        * [SevenZipComponent](https://github.com/3F/vsSolutionBuildEvent/blob/master/vsSolutionBuildEvent/SBEScripts/Components/SevenZipComponent.cs)
* [SBEScripts/](https://github.com/3F/vsSolutionBuildEvent/tree/master/vsSolutionBuildEvent/SBEScripts) namespace