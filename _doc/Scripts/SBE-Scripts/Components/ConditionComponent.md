---
layout: doc
title: ConditionComponent
description: Conditional statements for scripts.
permalink: /doc/Scripts/SBE-Scripts/Components/ConditionComponent/
---
# ConditionComponent

Conditional statements for [scripts]({{site.docp}}/Scripts/).

## Syntax

```{{site.sbelang1}}
#[(condition){ 
  body if the condition has true value
}
else{ 
  body if the condition has false value
}]
```

```{{site.sbelang1}}
#[(condition){ body if condition has true value }]
```


## Available operators

```text
 ===, !==, ~=, ==, !=, >=, <=, !, >, < 
```
**v0.11.3+**:

```text
 ^=, =^
```
Rules of comparison:

* **===** 
    * Compares as: left == right as string
* **!==**
    * Compares as: left != right as string
* **~=**
    * Compares as: left Contains right ?
* **&#094;=**
    * Compares as: left Begins with right ?
* **=^**
    * Compares as: left Ends with right ?
* **==** 
    * Compares in order of: 
        * left == right as numeric
        * left == right as boolean
        * left == right as string
* **!=** 
    * Compares in order of: 
        * left != right as numeric
        * left != right as boolean
        * left != right as string
* **>**
    * Compares as: left > right as numeric
* **>=**
    * Compares as: left >= right as numeric
* **<**
    * Compares as: left < right as numeric
* **<=**
    * Compares as: left <= right as numeric
* **!**
    * Inverts result of the expression in the used brackets

## Composite Conditions ##

Composite Conditions **available with v0.11** with limited Short-circuit Evaluation (separately for all brackets)

### && and || ###

```{{site.sbelang}}
#[( #[var count] > 10 || ($(isAllow) && !false) ) {
    ...
}
else{
    ...
}]
```

```{{site.sbelang}}
#[($(Configuration) ~= Deb && $(count) > 10 || $(Configuration) == "Release" ) {
    ...
}]
```

```{{site.sbelang}}
#[( (1 < 2 && 2 == 2 && ( true || ((false || 2 >= 2) && (1 > 7 && true)))) )
{
    #[( #[var count] > 10 || ($(isAllow) && !false) ) {
        ...
    }
    else{
        ...
    }]
}]
```

## Examples ##

```{{site.sbelang}}
#[7z pack.files({ 
            "$(pDirBridge)bin\$(cfg)\Bridge.dll", 
            "$(pDirBridge)bin\$(cfg)\Bridge.pdb",
            
#[( $(DocumentationFile) != "" && $(DocumentationFile) != "*Undefined*" ) { 
            "$(pDirBridge)bin\$(cfg)\Bridge.xml",
}]
            "$(pDirBridge)bin\$(cfg)\Release_notes.txt" }, "$(odir)Bridge_v$(numBridge)_[$(branchSha1)][$(netStamp)].zip")]
```

```{{site.sbelang}}
#[( $(Configuration) ~= "Release" ) {  CI_Release, Release_net45
    #[var ver = #[var ver].#[var revBuild]]
}]
```

```{{site.sbelang}}
#[(#[Build projects.find("ZenLib").IsBuildable]) {
    #[var branchSha1 = #[File sout("git", "rev-parse --short HEAD")]]
}]
```

```{{site.sbelang}}
#[( !(1 > 2) ) {
    is greater
}]
```

### Comparing strings. Case insensitive.

You can use the [MSBuild](../../../MSBuild) core and [String.ToLower](https://msdn.microsoft.com/en-us/library/system.string.tolower.aspx) Method for your variables, for example:

```{{site.sbelang}}
#[( $(left.ToLower()) ^= $(right.ToLower()) ) {
    Yes
}
else{
    No
}]
```
