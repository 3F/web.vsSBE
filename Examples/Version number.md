# Automatic Version Numbering

![Version class](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/examples/VersionClass.gif)

## VSPackages (VSIX Package/.vsixmanifest) and for others

*this variant also used for our project:  [Full script for assembling the vsSolutionBuildEvent v0.11](https://gist.github.com/3F/3f2f56dfc2a01dc99c63) (actual version in current [script file](https://bitbucket.org/3F/vssolutionbuildevent/src/master/.vssbe))*

### For v0.9+

*Variant for older versions or as alternative is contained below*

* Select event type - "Pre-Build".
* Change "Processing mode" to 'Script Mode'
* Add action & Activate [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) support
* Write next script, for example:
```
#!java
#[File replace.Regexp("projectname/source.extension.vsixmanifest", "<Version>[0-9\.]+</Version>", "<Version>#[var ver]</Version>")]
```
**Where**, `#[var ver]` it's your number(see [UserVariableComponent](../Scripts_&_Commands/SBE-Scripts/Components/UserVariableComponent)). You can change value with next variants:

* Getting from [MSBuild Property](../Scripts_&_Commands/MSBuild) `#[var ver = $(name)]`
* Getting from file: `#[var ver = #[File get("_version")]]`
* Getting from your external utility(stdout): `#[var ver = #[File sout("updv.exe", "-s new")]]`
* Manually set - `#[var ver = 1.2.3]` 
* Other with [MSBuild](../Scripts_&_Commands/MSBuild) & [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)

#### Generating the Version class & Build/revision Number

* Create template of Version class e.g.: **Version.tpl** with what you want, using placeholders instead of real values - sample for C#:

```
#!c#

namespace example
{
    class Version
    {
        public static readonly System.Version number    = new System.Version(%Version%);
        public const string numberWithRevString         = "%VersionRevString%";
        public const string numberString                = "%VersionString%";
        public const string branchName                  = "%branchName%";
        public const string branchSha1                  = "%branchSha1%";
        public const string branchRevCount              = "%branchRevCount%";
    }
}
```

*Similarly for others... e.g. for C++ you can also use preprocessor directives - #define (macro definitions):*

```
#!cpp

#ifndef REVISION_H 
  #define REVISION_STR "%VersionRevString% [ %branchSha1% ] /'%branchName%':%branchRevCount%" 
  #define L_REVISION_STR L"%VersionRevString% [ %branchSha1% ] /'%branchName%':%branchRevCount%" 
#endif 
```
*or similar class as above..*

* Create file e.g.: **_version** and write current number of your project like a **major**.**minor**. and similar
* Select event type - "Pre-Build".
* Change "Processing mode" to 'Interpreter Mode' or 'Script Mode'
* Activate [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) support
* Activate [MSBuild](../Scripts_&_Commands/MSBuild) support
* Write the next script, for example:

*please also see [Date & Time](../Features/Date & Time) features for more details about limitations*

```
#!java

#[" 
     Updating version
"]

#[var ver   = #[File get("_version")]]
#[var tpl   = #[File get("Version.tpl")]]
#[var pDir  = $($(ProjectDir:$(SolutionName)))]

#[var tStart    = $([System.DateTime]::Parse("2015/04/01").ToBinary())]
#[var tNow      = $([System.DateTime]::UtcNow.Ticks)]
#[var revBuild  = $([System.TimeSpan]::FromTicks($([MSBuild]::Subtract(#[var tNow], #[var tStart]))).TotalMinutes.ToString("0"))]

#[var cs = $(tpl.Replace(%Version%, "$(ver.Replace(".", ", ")), #[var revBuild]"))]
#[var cs = $(cs.Replace(%VersionRevString%, "$(ver).#[var revBuild]").Replace(%VersionString%, "$(ver)"))]

#[( #[File exists.directory(".git")] && #[File exists.file("git.exe", true)] ) {

    #[var branchSha1        = #[File sout("git", "rev-parse --short HEAD")]]
    #[var branchName        = #[File sout("git", "rev-parse --abbrev-ref HEAD")]]
    #[var branchRevCount    = #[File sout("git", "rev-list HEAD --count")]]
    
    #[var cs = $(cs.Replace(%branchName%, "#[var branchName]").Replace(%branchSha1%, "#[var branchSha1]").Replace(%branchRevCount%, "#[var branchRevCount]"))]
}
else {
    #[var cs = $(cs.Replace(%branchName%, "-").Replace(%branchSha1%, "-").Replace(%branchRevCount%, "-"))]
}]

#[File write("#[var pDir]Version.cs"):#[var cs]]

#[" 
    .vsixmanifest
"]
#[File replace.Regexp("#[var pDir]/source.extension.vsixmanifest", "<Version>[0-9\.]+</Version>", "<Version>#[var ver]</Version>")]
```
* Activate event and click apply.

As result you have the **Version.cs** class for your project (should be included in main project with the `Build Action` as **Compile**)

```
#!c#

namespace example
{
    class Version
    {
        public static readonly System.Version number    = new System.Version(0, 9, 0, 176489);
        public const string numberWithRevString         = "0.9.0.176489";
        public const string numberString                = "0.9.0";
        public const string branchName                  = "master";
        public const string branchSha1                  = "d7afb3f";
        public const string branchRevCount              = "129";
    }
}
```

and **vsixmanifest** file with updated number.

Also you can use the conditions for rev. number, for example:

```
#!java

#[($(Configuration) == Release){
    #[var ver = #[var ver].#[var revBuild]]
}]
...
#[File replace.Regexp("source.extension.vsixmanifest", "<Version>[0-9\.]+</Version>", "<Version>#[var ver]</Version>")]
```
In example above, should be 0.9.0**.176489** for **Release** configuration and 0.9.0 for another

Note:

This hard line in example above:
```
#!java

#[var cs = $(tpl.Replace(%Version%, "$(ver.Replace(".", ", ")), #[var revBuild]"))]
```

can be converted to simple:
```
#!java

#[var ver   = $(ver.Replace(".", ", ")), $(revBuild)]
#[var tpl   = $(tpl.Replace(%Version%, "$(ver)"))]
```
            
and similar... 

* *[Sample of how to use it for 'Assembly' attributes etc.](https://gist.github.com/3F/f54ad9736a9cbb984785)*

You can also test/debug all scripts with our testing tools, look in the `Settings` - `Tools`


### Variant with the own utility as part of solution (or variant for versions < v0.9) 

***!*** With v0.9 or higher you can use the [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)

#### Synopsis

This method should automatically generate the class, e.g.: ↘


```
#!C#

// This code was generated by a tool
class Version
{
    public static readonly System.Version number    = new System.Version(0, 8, 0, 118696);
    public const string numberWithRevString         = "0.8.0.118696";
    public const string numberString                = "0.8.0";
    public const string branchName                  = "master";
    public const string branchSha1                  = "f4c5546";
    public const string branchRevCount              = "88";
}
```
Then, we can use this in different places:

• For VSIX Package, sample: 
```
#!C#

[InstalledProductRegistration("#110", "#112", Version.numberWithRevString, IconResourceID = 400)]
```

• For AssemblyInfo, sample:

```
#!C#

[assembly: AssemblyVersion(Version.numberString)]
```

• Other places, e.g:

```
#!C#

  toolVersion.Text = string.Format("v{0} [ {1} ]", Version.numberString, Version.branchSha1);
  etc.,
```


For **.vsixmanifest** it's a little harder. The <Version> in .vsixmanifest, follows the CLR assembly versioning format: Major.Minor.Build.Revision (1.2.40308.00). see MSDN:

* [VSIX Extension Schema 2.0 Reference](http://msdn.microsoft.com/en-us/library/hh696828.aspx)
* [System.Version](http://msdn.microsoft.com/en-us/library/System.Version%28v=vs.110%29.aspx)
    
therefore, we can update this only as replacement, see below


#### Step 1. Preparing utility 

The next steps:

* Create in your solution any project (on C++/C#/VB ... not important) for controlling version of main application.
* Create template of Version class e.g.: Version.tpl with what you want, using placeholders instead of real values - sample:


```
#!C#

// Version.tpl:
namespace Example
{
    class Version
    {
        public static readonly System.Version number    = new System.Version(%Version%);
        public const string branchSha1                  = "%branchSha1%";
        ...
    }
}
```

* Now you can create any handler for work with current template. Basically you need simple implement:
* * Loading Version.tpl
* * Replacement all using placeholders on real data
* * Replacement the section of <version></version> in .vsixmanifest file
* * Optional, you can work with .git folder for getting information about branch - sha1, name, etc..

It's easy (time etc.) and examples of basic implementation, you can found in [current repository](https://bitbucket.org/3F/vssolutionbuildevent/src)

After implementing, we can work with this utility in vsSBE

#### Step 2. Settings vsSBE

* Select event type - "Pre-Build".
* Change "Processing mode" to Interpreter Mode
* Activate MSBuild support
* In 'Execution Order', find and select your implemented utility (in example - it's Version) - Activate and set range as "After"
* Interpreter settings: 
* * Simple "cmd.exe /C"
* * Wrapper & modification lines - should be as empty
* Enable - "Waiting for completion"

Your utility can receive some arguments(for reuse later), so you can write the next script, for example:


```
#!bash

$(sln = $(SolutionDir.Replace('\', '/')))

$(TargetPath:Version) 
  $(Configuration) 
  "$(sln)" 
  "Version/Version.tpl" 
  "vsSolutionBuildEvent/Version.cs" 
  "vsSolutionBuildEvent/source.extension.vsixmanifest" 
```

and similar..

Activate event and click apply

#### Result

Now we have next result:

* Before building the all projects in your solution ↓ 
* Only after completed building the Version utility ↓ 
* Should automatically:
* * Generating Version.cs with properties of version, sha1 and other
* * * The Version.cs should be included in main project with the `Build Action` as **Compile**
* * * And recommend to ignore this, for your SCM (.gitignore, .hgignore, .bzrignore, svn:ignore, etc.,)
* * Updating .vsixmanifest
* After completed → building the remaining projects in the solution. Done.

**note:** *we strongly recommend to use the new variants with [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) above - it's easy and fast*

# References

* [Custom counters](../Features/Custom counters)
* [Date & Time](../Features/Date & Time)
* [Artefacts. How to prepare as you want](Artefacts)
* [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)
* [MSBuild](../Scripts_&_Commands/MSBuild)
* [Visual Studio Gallery page](http://visualstudiogallery.msdn.microsoft.com/0d1dbfd7-ed8a-40af-ae39-281bfeca2334/)
* [Examples & Features](../Examples)
