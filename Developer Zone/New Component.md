# Creating Component for SBE-Scripts core #

All components should implement the **[IComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs)**

```
#!c#

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
Also available abstract [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) for rapid implementation of all new features. The [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) already contains basic behaviours with available data. Therefore, create the new component really easy.

## DemoComponent ##

Creating DemoComponent step by step.

All components should have a postfix **Component** as part of name, for example: MathComponent

* Add new class in path `/SBEScripts/Components/DemoComponent.cs`

```
#!c#

public class DemoComponent: Component, IComponent
{

}
```

With [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/Component.cs) we have already implemented common requirements of [IComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs), therefore, only need to implement own logic. For example:

For Condition property we should set subcontainer to entry, for basic checking of ability to work with data. In example we use:

```
#!c#

public override string Condition
{
    get { return "Demo "; }
}
```

If your component requires complex identification, use [CRegex](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs) flag, for using regex pattern (pattern used [IgnorePatternWhitespace](http://msdn.microsoft.com/en-us/library/system.text.regularexpressions.regexoptions.aspx) by default)

You can override this property, or set **cregex** as true if your component extends [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/Component.cs). Example with additional handling for already existing component - [BuildComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/BuildComponent.cs):

```
#!c#
public class DemoComponent: Component, IComponent
{
    public override string Condition
    {
        get { return "^Build projects\\..+"; }
    }

    public DemoComponent(): base()
    {
        cregex = true;
    }
    ...
```

Now you should implement `parse(string data)` with what you want:

```
#!c#

public override string parse(string data)
{
    // TODO
    return String.Empty;
}
```

For example, we'll implement **add()** property, sample:

```
#!java

#[Demo add(1, 2)]
```

```
#!c#

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
**Note**: the regular expression used for this example it's a variant of implementation i.e. you can use anything else what you like...

Then, with default [Bootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Bootloader.cs) just to register your component as `register(new DemoComponent())`:

```
#!c#

protected virtual void init()
{
    ...
    register(new DemoComponent());
}
```

You can also use others bootloaders. Simply to implement the [IBootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/IBootloader.cs) (also you can override [Bootloader.init()](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Bootloader.cs)) and initialize the new instance of SBE-Scripts core, for example:
```
#!c#

new Script(new BootloaderCustom())
```

That's all. Build and Run vsSBE, open `Tools` - `SBE-Scripts` and try to execute:

```
#!java

#[Demo add(7, 5)]
```

Congratulation! DemoComponent() has been implemented.

What's next ? how to implement more complex logic and how to work with MSBuild & User-Variables, you can see with sources with real components - [SBEScripts/](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/)

Also, if you wish to share your component for current project - use the pull request (on Bitbucket or GitHub), or send directly as .patch file with available contacts.

## Dom & Code Completion ##

Optional, you can describe your component with [SBEScripts/Dom](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Dom/) for code completion (Intellisense) or to any generation of documentation.

It's easy with next attributes:

### PropertyAttribute ###

To describe the properties of the component. For example:

```
#!c#

[Property("propertyName", "Description of the property", CValueType.Boolean, CValueType.Boolean)]
protected string yourLogic()
{
   ...
}
```

```
#!c#

[Property(
    "IsBuildable", 
    "Gets or Sets whether the project or project item configuration can be built.", 
    "find", 
    "stProjectConf", 
    CValueType.Boolean, 
    CValueType.Boolean
)]
```


Syntax:
```
#!c#
[Property(string name, string description, CValueType get, CValueType set)]
```

```
#!c#
[Property(string name, string parent, string method, CValueType get, CValueType set)]
```


Note:

* Type of the get/set should be as [CValueType](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/CValueType.cs)
* The **parent** it's optional argument used for linking on parent element (property/method etc.) if exist
* * The **method** argument should contain the real method name who implements the parent element (property/method etc.) 
* All available constructors see with the [Dom.PropertyAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Dom/PropertyAttribute.cs).

### MethodAttribute ###

To describe the methods/functions of the component. For example:


```
#!c#

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
```

Syntax:

```
#!c#

[Method(string name, string description, CValueType ret, params CValueType[] args)]
```
```
#!c#

[Method(string name, string parent, string method, CValueType ret, params CValueType[] args)]
```

Note:

* Type of the get/set should be as [CValueType](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/CValueType.cs)
* The **parent** it's optional argument used for linking on parent element (property/method etc.) if exist
* * The **method** argument should contain the real method name who implements the parent element (property/method etc.) 
* All available constructors see with the [Dom.MethodAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Dom/MethodAttribute.cs)

### ComponentAttribute ###

To describe the new component. For example:

```
#!c#

[Component("File", "I/O operations")]
public class FileComponent: Component, IComponent
{
    ...
}
```
Syntax:
```
#!c#

[Component(string name, string description)]
```

All available constructors see with the [Dom.ComponentAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Dom/ComponentAttribute.cs)


### DefinitionAttribute ###

To describe the any definition of the component. For example:
```
#!c#

[Definition("(true) { }", "Conditionals statements\n\n(1 > 2) {\n ... \n}")]
public class ConditionComponent: Component, IComponent
{
    ...
}
```

```
#!c#
    [Definition("var name", "Get data from variable the 'name'")]
    [Definition("var name = data", "Set the 'data' for variable the 'name'")]
```

Syntax:
```
#!c#

[Definition(string name, string description)]
```

All available constructors see with the [Dom.DefinitionAttribute](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Dom/DefinitionAttribute.cs)

## Have a question ? ##

If you have a question or have a some problem with creating new component, just [create the new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new)

For more details you can see:

* Interface [IComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs)
* abstract  [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/Component.cs)
* [Bootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Bootloader.cs) ([IBootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/IBootloader.cs))
* **[Existing components](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/)** - *more details you can see in the real implementation.*
* [SBEScripts/](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/) namespace

