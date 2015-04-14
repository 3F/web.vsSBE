# Stop build on first error

![Build has been canceled](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/examples/stop_build.png)

Immediately stop(at the same time) after the first appearance.

For example,

If you also used [StopOnFirstBuildError](http://visualstudiogallery.msdn.microsoft.com/91aaa139-5d3c-43a7-b39f-369196a84fa5) before, you can see that it not resolve important problem for big projects or/and for slow machines...

A quick example what that mean:

* If your **each project** in your solution requires a long time for full compilation (~5-10min average for example)...
* Well, congratulation.. you still should a wait the end of building project **where error occurred**(~5-10min average for example).

Why ? and Why not exist any settings for this ? we don't know but this so **because** the StopOnFirstBuildError used subscription with [OnBuildProjConfigDone](https://msdn.microsoft.com/en-us/library/envdte._dispbuildevents.onbuildprojconfigdone%28v=vs.120%29.aspx) - However this should be as is... after a project configuration is finished building. 

It seems useful for some others case, However... not for this ...
So! what to do with our solutions ? 

Simply add a some action for Error-Build event and configure this as you want - see below.

## Immediately stop for all

*for this variant you don't have to do anything, simply:*

* Select event type - "Errors-Build". 
* Add action & change "Processing mode" to Operation Mode
* Select "Stop building" in "Operation Variants"
* Activate event and click **apply**


*enjoy*

## A more flexible actions

You can also configure specific projects, configurations, specific errors and many others with available settings for this.

Also as variant you can use - [MSBuild](../Scripts_&_Commands/MSBuild) & [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts) for manual work with termination build or some additional actions before/after this.

*Feel free. You can what you want and as you want*

# References

* [Examples & Features](../Examples)
* [SBE-Scripts](../Scripts_&_Commands/SBE-Scripts)
* [MSBuild](../Scripts_&_Commands/MSBuild)

