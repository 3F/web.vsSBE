---
layout: doc
title: Simple Version Numbering
permalink: /doc/Examples/Version/Simple/
---
# Simple Version Numbering

![]({{site.docp}}/Resources/other/coffee.png)

Did you know: 

The most easy versioning for your projects can be lighter than it described in '[Manually](../Manually/) variant'.
And if you want configure all this manually instead of a [Wizard](../Wizard/), I'll tell you about a simple but still powerful way.


## Real projects

Firstly, you can look this trivial variants on real projects, for example:

* [https://github.com/3F/Conari](https://github.com/3F/Conari)
* [https://github.com/3F/LunaRoad](https://github.com/3F/LunaRoad)
* [https://github.com/3F/DllExport](https://github.com/3F/DllExport)

Currently all this above has been configured by this simple scheme.

### How to

In '[Manually variant](../Manually/)' we create a template of 'Version' file, then generate all of what we need.

But here we will create a 'normal Version file' (file that's already stored with other files of project and can be controlled by SCM as and other).

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

Ok, now we have different information about product that can be used in [different places](https://gist.github.com/3F/f54ad9736a9cbb984785). How to manage it ?

As you can see, you need control only for `S_NUM` *and optional `S_REV` + branch info.*

The same way, you may create `.version` file in root path of your project (or use something more, like special variable from CI servers, etc. see details [here](../Manually/)).

```
1.2.4  -> Major.Minor.Build.Revision etc.
```

then simple script:

```{{site.sbelang}}
#[var pVer = #[File get(".version")]]
#[IO replace.Regexp("$(pConari)/ConariVersion.cs", "(S_NUM\s+=).+?\";", "$1 \"$(pVer)\";")]
```

yes, that's all. Now it should be automatically updated by your configured events, for example, [Pre-Build]({{site.docp}}/Events/).

#### SCM info

To get additional (branch info above `_NAME`, `_SHA1`, `_REVC`) information from your SCM (for example, [git](https://git-scm.com/)) you can use same variant from '[Manually version](../Manually/)', i.e.:

```{{site.sbelang}}
#[( #[IO exists.directory(".git")] && #[IO exists.file("git.exe", true)] )
{
    #[var bSha1     = #[IO sout("git", "rev-parse --short HEAD")]]
    #[var bName     = #[IO sout("git", "rev-parse --abbrev-ref HEAD")]]
    #[var bRevCount = #[IO sout("git", "rev-list HEAD --count")]]
}
```

isn't simply ?

# References

* [Manually variant](../Manually/)
* [Wizard variant](../Wizard/)
* [SBE-Scripts]({{site.docp}}/Scripts/SBE-Scripts/)
* [Examples & Features]({{site.docp}}/Examples/)
