# Increment & Decrement Numbers [custom counters]

*Should be enabled the [MSBuild](../Scripts_&_Commands/MSBuild) & [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts).*

In examples below, we use the [MSBuild Property Functions](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_PropertyFunctions) and you can use any static method or property of these system classes:

* System.Math
* System.Decimal
* System.Double
* System.UInt16
* System.UInt32
* System.UInt64
* System.Int16
* System.Int32
* System.Int64
* System.TimeSpan
* System.DateTime
* [...](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_Static)

Example of counter in the range 1 - 10:

```
#!java

#[( $(counter) == "*Undefined*" ) {
    #[var counter = 0]
}]

    $(counter = $([MSBuild]::Add($(counter), 1)))

    #["
        The variable $(counter) should contain the number in the range 1 - 10
    "]

#[( $(counter) >= 10 ) {
    #[var counter = 0]
}]
```

Needed a more exotic control ? no problem:
```
#!java

#[($(numX) == "*Undefined*") {
    #[var numX    = 0]
    #[var numY    = 0]
    #[var numYmod = 0]
}]

$(numY    = $([MSBuild]::Add($(numY), 1)))
$(numYmod = $([MSBuild]::Modulo($(numY), 12)))

#[($(numYmod) == 0) {
    $(numX = $([MSBuild]::Add($(numX), 1)))
}]

#[var spec = $(numX).$(numYmod).$(numY)]
```

The variable **spec** in example above should contain the next values - ![Value of variable - spec](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/examples/ver_spec.gif)

# Unique number for team

In example on page [Date & Time](Date & Time) you know what the UTC it does not give any warranty for unique numbers and you should use the our **[CI features](../CI)** or something else..:

* You can also use any cryptographic hash function ([sha1](https://en.wikipedia.org/wiki/SHA-1), [MD5](https://en.wikipedia.org/wiki/MD5), [TTH](https://en.wikipedia.org/wiki/Merkle_tree#Tiger_tree_hash) etc.) with your specific unique identification (timestamp + computer identifier + ... and similar), for example:
```
#!java

#[var utcnow = $([System.DateTime]::UtcNow.Ticks)]
#[File sout("cmd", "/C echo \"#[var utcnow]\" | openssl sha1 | sed 's/^.*\s//'")]
```
`f80ba367786b1fc075bf04104a69656141202aa5`

**Note:** In example above we use the [openssl](https://www.openssl.org/docs/apps/openssl.html)

* Of course you can use the [Globally Unique Identifier (GUID)](https://en.wikipedia.org/wiki/Globally_unique_identifier) as part of mscorlib.dll - [System.Guid](https://msdn.microsoft.com/en-us/library/system.guid%28v=vs.100%29.aspx):

```
#!java

$([System.Guid]::NewGuid())
```
`364c741c-21da-4c85-8d33-abf15b7c9672`

if needed sha1 you can also recalculate this:
```
#!java

#[var guid = $([System.Guid]::NewGuid())]
#[File sout("cmd", "/C echo \"#[var guid]\" | openssl sha1 | sed 's/^.*\s//'")]
```
`2580219018d287e84de683f4cd74822ba952c96f`

and similar..

# References #

* [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)
* * [ConditionComponent](../Scripts_&_Commands/SBE-Scripts/Components/ConditionComponent)
* [MSBuild](../Scripts_&_Commands/MSBuild)
* [Date & Time](Date & Time)
* [Automatic Version Numbering for VSIX Package](../Examples/Version number)
* [OpenSSL Project](https://openssl.org)
* MSDN:
* * [System.Guid](https://msdn.microsoft.com/en-us/library/system.guid%28v=vs.100%29.aspx)


