---
layout: doc
title: Creating Component for SBE-Scripts core
permalink: /doc/Dev/New Component/
---
# Creating Component for SBE-Scripts core

All components should implement the **[IComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs)**

{% highlight csharp %}

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
{% endhighlight %}
Also available abstract [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) for rapid implementation of all new features. The [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) already contains basic behaviours with available data. Therefore, create the new component really easy.

## DemoComponent ##

Creating DemoComponent step by step.

All components should have a postfix **Component** as part of name, for example: MathComponent

* Add new class in path `/SBEScripts/Components/DemoComponent.cs`

{% highlight csharp %}

public class DemoComponent: Component, IComponent
{

}
{% endhighlight %}

With [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) we have already implemented common requirements of [IComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs), therefore, only need to implement own logic. For example:

For Condition property we should set subcontainer to entry, for basic checking of ability to work with data. In example we use:

{% highlight csharp %}

public override string Condition
{
    get { return "Demo "; }
}
{% endhighlight %}

If necessary complex identification, use [CRegex](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs) flag for regex pattern ( [IgnorePatternWhitespace](http://msdn.microsoft.com/en-us/library/system.text.regularexpressions.regexoptions.aspx) used by default)

You can override this property or use cregex field if your component extends [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs). Example with additional handling for already existing component - [BuildComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/BuildComponent.cs):

{% highlight csharp %}
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
{% endhighlight %}

Now you should implement `parse(string data)` with what you want:

{% highlight csharp %}

public override string parse(string data)
{
    // TODO
    return String.Empty;
}
{% endhighlight %}

For example, we'll implement **add()** property, sample:

{% highlight java %}

#[Demo add(1, 2)]
{% endhighlight %}

{% highlight csharp %}

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
{% endhighlight %}
**Note**: the regular expression it's only as variant of implementation i.e. you can use anything else what you like... for example:

{% highlight csharp %}

public class DemoComponent: Component, IComponent 
{ 
    public override string Condition 
    { 
        get { return "Demo "; } 
    } 
    
    public override string parse(string data) 
    {
        return Values.from(1 + 2); 
    } 
}
{% endhighlight %}

Then, with default [Bootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Bootloader.cs) to register your component, use for example:

{% highlight csharp %}

bootloader.register(new DemoComponent());
{% endhighlight %}

You can also use own Bootloaders with implementing the [IBootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/IBootloader.cs) or simply override [Bootloader.register()](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Bootloader.cs):
{% highlight csharp %}

protected override void register()
{
    ...
    register(new DemoComponent());
}
{% endhighlight %}

Then to initialize new instance of SBE-Scripts core, use for example:
{% highlight csharp %}

new Script(new BootloaderCustom())
{% endhighlight %}

That's all. Build and Run vsSBE, open `Tools` - `SBE-Scripts` and try to execute:

{% highlight java %}

#[Demo add(7, 5)]
{% endhighlight %}

Congratulation! DemoComponent() has been implemented.

What's next ? how to implement more complex logic and how to work with MSBuild & User-Variables, you can see with sources with real components - [SBEScripts/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/)

Also, if you wish to share your component for current project - use the pull request (on Bitbucket or GitHub), or send directly as .patch file with available contacts.

## How about plugin system for this

Currently, it's only for internal structures. *It can be later, because it's really useful, or convenient at least.*

**But**, today this was not necessary for our users. Otherwise, you should [create](https://bitbucket.org/3F/vssolutionbuildevent/issues/new) issue and **vote** for this - we'll look it as demand among users.

Also, as variant you can see [C# Mode](../../Modes/CSharp/) as equivalent to your actions at runtime.

## Dom & Code Completion

Optional, you can describe your component with [SBEScripts/Dom](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Dom/) for code completion (Intellisense) or to any generation of documentation.

It's easy with next attributes:

### PropertyAttribute

To describe the properties of the component. For example:

{% highlight csharp %}

[Property("propertyName", "Description of the property", CValueType.Boolean, CValueType.Boolean)]
protected string yourLogic()
{
   ...
}
{% endhighlight %}

{% highlight csharp %}

[Property(
    "IsBuildable", 
    "Gets or Sets whether the project or project item configuration can be built.", 
    "find", 
    "stProjectConf", 
    CValueType.Boolean, 
    CValueType.Boolean
)]
{% endhighlight %}


Syntax:
{% highlight csharp %}
[Property(string name, string description, CValueType get, CValueType set)]
{% endhighlight %}

{% highlight csharp %}
[Property(string name, string parent, string method, CValueType get, CValueType set)]
{% endhighlight %}


Note:

* Type of the get/set should be as [CValueType](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/CValueType.cs)
* The **parent** it's optional argument used for linking on parent element (property/method etc.) if exist
* * The **method** argument should contain the real method name who implements the parent element (property/method etc.) 
* All available constructors see with the [Dom.PropertyAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Dom/PropertyAttribute.cs).

### MethodAttribute ###

To describe the methods/functions of the component. For example:


{% highlight csharp %}

[
    Method
    (
        "call", 
        "Caller of executable files with arguments.", 
        new string[] { "name", "args" }, 
        new string[] { "Executable file", "Arguments" }, 
        CValueType.Void, 
        CValueType.String, CValueType.String
    )
]
protected string stCall(string data, bool stdOut, bool silent)
{
    ...
}
{% endhighlight %}

Syntax:

{% highlight csharp %}

[Method(string name, string description, CValueType ret, params CValueType[] args)]
{% endhighlight %}
{% highlight csharp %}

[Method(string name, string parent, string method, CValueType ret, params CValueType[] args)]
{% endhighlight %}

Note:

* Type of the get/set should be as [CValueType](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/CValueType.cs)
* The **parent** it's optional argument used for linking on parent element (property/method etc.) if exist
* * The **method** argument should contain the real method name who implements the parent element (property/method etc.) 
* All available constructors see with the [Dom.MethodAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Dom/MethodAttribute.cs)

### ComponentAttribute ###

To describe the new component. For example:

{% highlight csharp %}

[Component("File", "I/O operations")]
public class FileComponent: Component, IComponent
{
    ...
}
{% endhighlight %}
Syntax:
{% highlight csharp %}

[Component(string name, string description)]
{% endhighlight %}

All available constructors see with the [Dom.ComponentAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Dom/ComponentAttribute.cs)

#### Aliases

{% highlight csharp %}

[Component("Primary", new string[]{ "Alias1", "Alias2", "Alias3" }, "description")]
{% endhighlight %}

### DefinitionAttribute ###

To describe the any definition of the component. For example:
{% highlight csharp %}

[Definition("(true) { }", "Conditionals statements\n\n(1 > 2) {\n ... \n}")]
public class ConditionComponent: Component, IComponent
{
    ...
}
{% endhighlight %}

{% highlight csharp %}
[Definition("var name", "Get data from variable the 'name'")]
[Definition("var name = data", "Set the 'data' for variable the 'name'")]
{% endhighlight %}

Syntax:
{% highlight csharp %}

[Definition(string name, string description)]
{% endhighlight %}

All available constructors see with the [Dom.DefinitionAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Dom/DefinitionAttribute.cs)

## Have a question ? ##

If you have a question or have a some problem with creating new component, just [create the new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new)

For more details you can see:

* Interface [IComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs)
* abstract  [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/Component.cs)
* [Bootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Bootloader.cs) ([IBootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/IBootloader.cs))
* **[Existing components](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/Components/)** - *more details you can see in the real implementation.*
* [SBEScripts/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/SBEScripts/) namespace