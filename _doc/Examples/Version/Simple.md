---
layout: doc
title: Simple Version Numbering
permalink: /doc/Examples/Version/Simple/
---
# Simple Version Numbering

![]({{site.docp}}/Resources/other/coffee.png)

The most easy versioning for your projects can be lighter than it described in '[Manually](../Manually/)' page.
And if you still want to configure this manually instead of a [Wizard](../Wizard/), let's talk about simple but still powerful way.

## Real projects

First of all, you can look the real projects in action.

It is actively used for the following projects:

* [regXwild](https://github.com/3F/regXwild)
    * [Sample of build ![](https://img.shields.io/badge/Build30-passing-brightgreen.svg?style=flat)](https://ci.appveyor.com/project/3Fs/regxwild-github/builds/34562551)

* [7z.Libs](https://github.com/3F/7z.Libs)
* [MvsSln](https://github.com/3F/MvsSln)
* [Conari](https://github.com/3F/Conari)
* [DllExport](https://github.com/3F/DllExport)
* [hMSBuild](https://github.com/3F/hMSBuild)
* [LuNari](https://github.com/3F/LuNari)
* [GetNuTool](https://github.com/3F/GetNuTool)
* [vsSolutionBuildEvent](https://github.com/3F/vsSolutionBuildEvent)
* ...

### How to

In '[Manually](../Manually/)' page we create a template of 'Version' file, then generate all of what we need.

But here we'll create a 'normal Version file' (file that's already stored with other files of project and can be controlled by SCM as and other).

For C# it can be like this:

```csharp
// Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
namespace net.r_eg.Conari
{
    using System;

    public struct ConariVersion
    {
        public static readonly Version number = new Version(S_NUM_REV);

        public const string S_NUM       = "1.1.0";
        public const string S_REV       = "0";
        public const string S_NUM_REV   = S_NUM + "." + S_REV;

        public const string BRANCH_NAME = "-";
        public const string BRANCH_SHA1 = "-";
        public const string BRANCH_REVC = "-";

        internal const string S_INFO        = S_NUM_REV + " [ " + BRANCH_SHA1 + " ]";
        internal const string S_INFO_FULL   = S_INFO + " /'" + BRANCH_NAME + "':" + BRANCH_REVC;
    }
}
```

As you can see, you need only to control `S_NUM` *and optional `S_REV` + branch info.*

The same way, you can create `.version` file in root path of your project (or use something more, like special variable from CI servers, etc. see details [here](../Manually/)).

```
1.2.4  -> Major.Minor.Patch.Build etc.
```

then simple script:

```{{site.sbelang}}
#[var pVer = #[File get(".version")]]
#[IO replace.Regexp("$(pConari)/ConariVersion.cs", "(S_NUM\s+=).+?\";", "$1 \"$(pVer)\";")]
```

Yes, that's all. Now it should be automatically updated together with your [configured events]({{site.docp}}/Events/), for example, [Pre-Build]({{site.docp}}/Events/Pre-Build/).

#### SCM info

To get additional (branch info above `_NAME`, `_SHA1`, `_REVC`) information from your SCM (eg. [git](https://git-scm.com/) etc.) you can use the same way from '[Manually](../Manually/)' page. That is:

```{{site.sbelang}}
#[var bSha1     = #[IO sout("git", "rev-parse --short HEAD")]]
#[var bName     = #[IO sout("git", "rev-parse --abbrev-ref HEAD")]]
#[var bRevCount = #[IO sout("git", "rev-list HEAD --count")]]
```

Isn't it easy?

# References

* [Manually variant](../Manually/)
* [Wizard variant](../Wizard/)
* [SBE-Scripts]({{site.docp}}/Scripts/SBE-Scripts/)
* [Examples & Features]({{site.docp}}/Examples/)
