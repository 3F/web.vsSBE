---
layout: doc
title: Work with Unit-Tests & EnvDTE
permalink: /doc/Features/EnvDTE & Tests/
---
# Work with Unit-Tests & EnvDTE

This especially useful for old Visual Studio 2010 where are not exist simple settings for running tests after building your application or for another..

*Please remember: newest versions >= VS2012 contains settings for this. See [How to](http://msdn.microsoft.com/en-us/library/ms182465%28v=vs.110%29.aspx).*

Example, what variants exist for VS2010:

* MSDN: [Configure and Run Scheduled Tests After Building Your Application](http://msdn.microsoft.com/en-us/library/ms182465%28v=vs.100%29.aspx)
* MSDN: [Run Automated Tests from the Command Line Using MSTest](http://msdn.microsoft.com/en-us/library/ms182487%28v=vs.100%29.aspx)

vsSBE provides actions with commands and may work with [EnvDTE](http://msdn.microsoft.com/en-us/library/EnvDTE.aspx) environment. So, you can simply run all tests after building, e.g.:

* Use Operation Mode for your action.
* Select the operation - "Run all Unit-Tests" or "Debug all Unit-Tests".
* Set the specific configuration if needed this only for release configurations etc.
* Activate and click **apply**.

# Custom DTE-Commands

You can also manually configure all commands to Visual Studio with [DTE-Commands](../../Scripts/DTE-Commands/):

* Change "Processing mode" to 'Operation Mode'
* Select 'user custom' item in operations list.
* Write any commands separated by newline with UI helper - `Settings` - `Tools` - `DTE-Commands`
* Test this with `Settings` - `Tools` - `Execution DTE-Commands`

# Multiple mixed DTE-Commands for scripts

As variant you can use powerful and flexible control with the [SBE-Scripts](../../Scripts/SBE-Scripts/) core.

* For operations with an commands exists the [DTEComponent](../../Scripts/SBE-Scripts/Components/DTEComponent/)

Therefore you can use this as you want for example:

{% highlight java %}

#[($(Configuration) ~= "Release" && !$(Configuration) ~= "CI_") {
    #[DTE exec: Test.RunAllTestsInSolution]
}]
{% endhighlight %}
etc.


# References

* [SBE-Scripts](../../Scripts/SBE-Scripts/)
    * [DTEComponent](../../Scripts/SBE-Scripts/Components/DTEComponent/)
    * [ConditionComponent](../../Scripts/SBE-Scripts/Components/ConditionComponent/)
* [DTE-Commands](../../Scripts/DTE-Commands/)
* [Examples & Features](../../Examples/)
