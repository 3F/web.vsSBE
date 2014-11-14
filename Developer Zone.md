# Developer Zone #

## How to build vsSBE ##

### Requirements ###

* MS Visual Studio 2010 or higher
* Installed Microsoft Visual Studio SDK:
* * [For Visual Studio 2013](http://www.microsoft.com/en-us/download/details.aspx?id=40758)
* * [For Visual Studio 2012](http://www.microsoft.com/en-us/download/details.aspx?id=30668)
* * [For Visual Studio 2010](http://www.microsoft.com/en-us/download/details.aspx?id=2680) (without update SP1)
* * [For Visual Studio 2010 SP1](http://www.microsoft.com/en-us/download/details.aspx?id=21835) (after update to SP1)
* Microsoft .NET Framework:
* * [minimal v4.0 for develop on Visual Studio 2010](http://www.microsoft.com/en-US/download/details.aspx?id=17718)
* * [minimal v4.5 for develop on Visual Studio 2012](http://www.microsoft.com/en-US/download/details.aspx?id=30653) (Offline installer: [dotNetFx45_Full_x86_x64.exe](http://go.microsoft.com/fwlink/?LinkId=225702))
* * [minimal v4.5.1 for develop on Visual Studio 2013](http://www.microsoft.com/en-US/download/details.aspx?id=40779)
* [vsSBE](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/) v0.8.1 or higher
* [NuGet](https://www.nuget.org/) (starting with VS2012, NuGet is included in every edition. For VS2010, NuGet is available through the Extension Manager - [NuGet Package Manager](https://visualstudiogallery.msdn.microsoft.com/27077b70-9dad-4c64-adcf-c7cf6bc9970c))
* * more detail: http://docs.nuget.org/docs/start-here/installing-nuget
* [Moq 4](https://github.com/Moq/moq4) or higher
* [NLog v2](http://nlog-project.org/) or higher
* [Json.NET v6](http://json.codeplex.com/) or higher

### Build ###

* Install [latest vsSBE build](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/referral/118151)
* Open **.sln** file with your Visual studio
* * vsSolutionBuildEvent.sln for Visual Studio 2010
* * vsSolutionBuildEvent_2012.sln for Visual Studio 2012
* * other similar vsSolutionBuildEvent`_X`.sln where 'X' is a number version of used Visual Studio
* Find the 'vsSolutionBuildEvent' project in solution:
* * Set as SturtUp project
* * Open `Properties` → `Debug`:
* * * For `Start Action` - set as `Start External program`
* * * Then, select your **devenv**, e.g.: `C:\Program Files (x86)\Microsoft Visual Studio 12.0\Common7\IDE\devenv.exe`
* * In the `Start Options` → `Command line arguments` write the: '**/rootsuffix Exp**' (without quotes)
* Click `Build` → `Build Solution`
* Libraries: NLog, Json.NET, Moq - managed by NuGet and should be received automatically to ./packages directory. Otherwise, try add manually if exist some problems.

Congratulation! Now, you can running the vsSBE extension over experimental VS IDE for debugging

**Note about Unit-Tests**:

* Tests should be automatically running for all release-configurations after building. Or you can manualy start with `Test` → `Run` → `All Tests in Solution`
* Moq library also should automatically installed with NuGet, if not - simply run the following command in the [Package Manager Console](http://docs.nuget.org/docs/start-here/using-the-package-manager-console):
`PM> Install-Package Moq`

### Have a question ? ###

If you have a question or have a some problem with build, just [create the new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new)

If you have a some patch, - use the **pull request** *(on Bitbucket or GitHub)*,  or send directly as **.patch** file with available contacts

## Creating Component for SBE-Scripts core ##

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

### DemoComponent ###

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
    get { return "[Demo "; }
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
        get { return "^[Build projects\\..+"; }
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
        get { return "[Demo "; }
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

Also, if you wish to share with your component for current project - use the pull request (on Bitbucket or GitHub), or send directly as .patch file with available contacts.

**Have a question ?**

If you have a question or have a some problem with creating new component, just [create the new Issue](https://bitbucket.org/3F/vssolutionbuildevent/issues/new)

For more details you can see:

* Interface [IComponent](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/IComponent.cs)
* abstract  [Component](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/Component.cs)
* [Bootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Bootloader.cs) ([IBootloader](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/IBootloader.cs))
* [Existing components](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/Components/)
* [SBEScripts/](https://bitbucket.org/3F/vssolutionbuildevent/src/develop/vsSolutionBuildEvent/SBEScripts/) namespace


