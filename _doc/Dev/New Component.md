---
layout: doc
title: Creating Component for SBE-Scripts core
permalink: /doc/Dev/New Component/
---
# Creating Component for SBE-Scripts core

All components should implement the **[IComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs)**

```csharp 

public interface IComponent
{
    /// <summary>
    /// Ability to work with data for component
    /// </summary>
    string Condition { get; }

    /// <summary>
    /// Using regex engine for property - condition
    /// </summary>
    bool CRegex { get; }

    /// <summary>
    /// Activation status
    /// </summary>
    bool Enabled { get; set; }

    /// <summary>
    /// Flag of required post-processing with MSBuild core.
    /// In general, some components can require immediate processing with evaluation, before passing control to next level
    /// (e.g. FileComponent etc.) For such components need additional flag about allowed processing, if this used of course...
    /// </summary>
    bool PostProcessingMSBuild { get; set; }

    /// <summary>
    /// Should be located before deepening or not
    /// </summary>
    bool BeforeDeepen { get; }

    /// <summary>
    /// Forced post analysis or not
    /// </summary>
    bool PostParse { get; }

    /// <summary>
    /// Handler for current data
    /// </summary>
    /// <param name="data">mixed data</param>
    /// <returns>prepared and evaluated data</returns>
    string parse(string data);
}
```
Also available abstract [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) for rapid implementation of all new features. The [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) already contains basic behaviours with available data. Therefore, create the new component really easy.

## DemoComponent ##

Creating DemoComponent step by step.

All components should have a postfix **Component** as part of name, for example: MathComponent

* Add new class in path `/SBEScripts/Components/DemoComponent.cs`

```csharp 

public class DemoComponent: Component, IComponent
{

}
```

With [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) we have already implemented common requirements of [IComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs), therefore, only need to implement own logic. For example:

For Condition property we should set subcontainer to entry, for basic checking of ability to work with data. In example we use:

```csharp 

public override string Condition
{
    get { return "Demo "; }
}
```

Use [CRegex](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs) flag if identification needed with regex pattern ( [IgnorePatternWhitespace](http://msdn.microsoft.com/en-us/library/system.text.regularexpressions.regexoptions.aspx) used by default)

You can override this property or use cregex field if your component extends [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs). Example with additional handling for already existing component - [BuildComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/BuildComponent.cs):

```csharp 
public class DemoComponent: Component, IComponent
{
    public override string Condition
    {
        get { return "^Build projects\\..+"; }
        //or as alias: get { return @"(?:Build|Alias)\s"; } etc.
    }
    ...
    /// <summary>
    /// Use regex engine for the Condition property
    /// </summary>
    public override bool CRegex
    {
        get { return true; }
    }
    
//or you can (if extends abstract std. Component):
    public DemoComponent(): base()
    {
        cregex = true;
    }
```

Now you should implement `parse(string data)` with what you want:

```csharp 

public override string parse(string data)
{
    // TODO
    return String.Empty;
}
```

For example, we'll implement **add()** property, sample:

```java 

#[Demo add(1, 2)]
```


*Sample with* ***custom*** *parsing of syntax above:*

```csharp 

public class DemoComponent: Component, IComponent
{
    public override string Condition
    {
        get { return "Demo "; }
    }

    public override string parse(string data)
    {
        Match m = Regex.Match(data, @"^\[Demo
                                         \s+
                                         add\(
                                            \s*
                                            (\d+)   #1 - left
                                            \s*,\s*
                                            (\d+)   #2 - right
                                            \s*
                                         \)
                                      \]$",
                                      RegexOptions.IgnorePatternWhitespace);

        if(!m.Success) {
            throw new SyntaxIncorrectException("Failed DemoComponent - '{0}'", data);
        }

        int left = Values.toInt32(m.Groups[1].Value);
        int right = Values.toInt32(m.Groups[2].Value);

        return Values.from(left + right);
    }
}
```
**Note**: the regular expression in sample above it's only as custom variant of implementation i.e. you can use anything else with what you like... 
For example, you also can use **our [IPM analyzer](../SBE-Scripts/IPM/)** for parsing of any properties & methods:

```csharp 

public class DemoComponent: Component, IComponent 
{ 
    public override string Condition 
    { 
        get { return "Demo "; } 
    } 
    
    public override string parse(string data) 
    {
        IPM pm = new PM(data);
        ...
        return Values.from(a + b);
    } 
}
```

Then, with default [Bootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Bootloader.cs) to register your component, use for example:

```csharp 

bootloader.register(new DemoComponent());
```

You can also use own Bootloaders with implementing the [IBootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/IBootloader.cs) or simply override [Bootloader.register()](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Bootloader.cs):

```csharp 

protected override void register()
{
    ...
    register(new DemoComponent());
}
```

Then to initialize new instance of SBE-Scripts core, use for example:

```csharp 

new Script(new BootloaderCustom())
```

That's all. Build and Run vsSBE, open `Tools` - `SBE-Scripts` and try to execute:

```java 

#[Demo add(7, 5)]
```

Congratulation! DemoComponent() has been implemented.

What's next ? how to implement more complex logic and how to work with MSBuild & User-Variables, you can see with sources with real components - [SBEScripts/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/)

Also, if you wish to share your component for current project - use the pull request (on Bitbucket or GitHub), or send directly as .patch file with available contacts.

## How about plugin system for this

Currently, it's only for internal structures. *It can be later, because it's really useful, or convenient at least.*

**But**, today this was not necessary for our users. Otherwise, you should [create](https://bitbucket.org/3F/vssolutionbuildevent/issues/new) issue and **vote** for this - we'll look it as demand among users.

Also, as variant you can see already available:

* [C# Mode](../../Modes/CSharp/) as equivalent for your actions at runtime. *+Access to [scripts engines](../../Scripts/), including [SBE-Scripts](../../Scripts/SBE-Scripts/).*
* [API](../../API/) level.
    * [client.vssbe.dll](../../API/#client-vssbe-dll) as part of [API](../../API/) for work with events from our core library.

## Have a question ?

If you have a question or have a some problem with creating new component, just [create new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new)

# References

* [IPM analyzer](../SBE-Scripts/IPM/)
* [Dom & Code Completion](../SBE-Scripts/Dom/)
* Interface [IComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs)
* abstract  [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs)
* [Bootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Bootloader.cs) ([IBootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/IBootloader.cs))
* **[Existing components](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/)** - *more details you can see in the real implementation.*
* [SBEScripts/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/) namespace