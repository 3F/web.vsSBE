---
layout: doc
title: Advanced work with Git submodules
permalink: /doc/Examples/Git/Submodules/
---
## Advanced work with Git submodules

### Restore all git submodules when opening Visual Studio IDE 

Before v0.12.8 you have [this way]({{site.docp}}/Examples/ReloadProjects/). But now it can be much easier.

1. Add Action for [Sln-Opened]({{site.docp}}/Events/SlnOpened/) event.
1. Set Context: `Before`
1. Select [Script Mode]({{site.docp}}/Modes/Script/)

Then add simple script, for example, we want to restore [Conari](https://github.com/3F/Conari):

```{{site.sbelang}}
#[( !(#[IO exists.file("$(pConari)/Conari.sln")]) )
{
    #[File call("git", "submodule update --init Conari", 1000)]
}]
```

Additionally you can restore and prepare .NET Core projects and/or some related nuget packages (including legacy packages.config), for example:

```{{site.sbelang}}
#[( !(#[IO exists.file("packages/__checked")]) )
{
    #[File call("hmsbuild.bat", "-t:restore /v:q /nologo /p:Configuration=$(Configuration) /p:Platform=\"Any CPU\"", 1000)]
        
    #[NuGet gnt.raw("/p:ngconfig=\"packages.config\" /nologo /v:m /m:4")]
    
    #[IO copy.directory("", "packages/", true)]
    #[File write("packages/__checked"): ]
}]
```

Activate action and click [Apply]

Now, when some user will receive your source code:

* Before first loading solution (after click on **.sln**) will be a "black window" with automatic restoring submodules.
    * "black window" can be hidden (see settings) but it can take a long time for restoring all packages. For this case the best way to show some information.

About CI [here]({{site.docp}}/CI/)


### How to process large list of submodules

For example:

```{{site.sbelang}}
#[$(_tprjs = 'MvsSln;E-MSBuild;LSender;SobaScript;SobaScript.Mapper;SobaScript.Z.Core;SobaScript.Z.Ext;SobaScript.Z.VS;Varhead')]

#[$(loop = true)]
#[Box iterate(i = 0; $(loop); i += 1): #[try
{
    #[$(_p = "$(_tprjs.Split(';')[$(i)].Trim())")]
    #[try 
    {
        #[( $(_p) != "" ) 
        {
            #[( !(#[IO exists.file("$(_p)/$(_p).sln")]) ) { #[File call("git", "submodule update --init $(_p)", 1000)] }]
        }]
    }
    catch(err, msg){ #[IO writeLine(STDERR): Cfg .props.user failed: #[$(msg)] ] }]
}
catch { $(loop = false) }] ]

#[" Packages "]

#[( !(#[IO exists.file("packages/__checked")]) )
{
    #[IO writeLine(STDOUT): Restoring packages. Please wait ...]
    #[File call("tools\hmsbuild.bat", "-t:restore /v:q /nologo /p:Configuration=$(Configuration) /p:Platform=\"Any CPU\"", 1000)]

    #[NuGet gnt.raw("/p:ngconfig=\".gnt/packages.config;vsSolutionBuildEvent/packages.config;vsSolutionBuildEventTest/packages.config\" /nologo /v:m /m:6")]    
    
    #[IO copy.directory("", "packages/", true)]
    #[File write("packages/__checked"): ]
}]
```


## References

* [MSBuild]({{site.docp}}/Scripts/MSBuild/)
* [C# Mode]({{site.docp}}/Modes/CSharp/)
    * [Processing modes]({{site.docp}}/Modes/)
* [Sln-Opened]({{site.docp}}/Events/SlnOpened/#context)
    * [Events]({{site.docp}}/Events/)
* [Examples & Features]({{site.docp}}/Examples/)