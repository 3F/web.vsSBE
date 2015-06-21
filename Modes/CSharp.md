# C# Mode

This for work with C# compiler - feel free with all events & actions.

*Available control of caching bytecode and full access to [ICommand](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Actions/ICommand.cs) & [ISolutionEvent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Events/ISolutionEvent.cs) (can be cast [on similars](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Events/))*

# Default Entry point

```
#!csharp

using System;
using ICommand = net.r_eg.vsSBE.Actions.ICommand;
using ISolutionEvent = net.r_eg.vsSBE.Events.ISolutionEvent;

namespace vsSolutionBuildEvent
{
    public class CSharpMode
    {
        public static int Init(ICommand cmd, ISolutionEvent evt)
        {
            return 0;
        }
    }
}
```

# Examples

See our source code for more details about [ICommand](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Actions/ICommand.cs) & [ISolutionEvent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Events/ISolutionEvent.cs).

## Write to VS Output - 'Build' item

* Activate C# Mode
* Add **'EnvDTE.dll'** references in `Compiler` - `References`
* Customize cache and others optimization.
* Use the next source code, for example:

```
#!csharp

using System;
using ICommand = net.r_eg.vsSBE.Actions.ICommand;
using ISolutionEvent = net.r_eg.vsSBE.Events.ISolutionEvent;

namespace vsSolutionBuildEvent
{
    public class CSharpMode
    {
        public static int Init(ICommand cmd, ISolutionEvent evt)
        {
            cmd.Env.OutputWindowPane.getByName("Build", true).OutputString("Hello World!\n");
            return 0;
        }
    }
}
```

* Activate Event and click Apply.
* Enjoy!

# References

* [Processing modes](../Modes)
* [Examples & Features](../Examples)
* [ICommand](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Actions/ICommand.cs) 
* [ISolutionEvent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Events/ISolutionEvent.cs)
* [Actions/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Actions/)
* [Events/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Events/)