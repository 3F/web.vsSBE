---
layout: doc
title: C# Mode
permalink: /doc/Modes/CSharp/
---
# C# Mode

This for work with C# compiler - feel free with all events & actions.

*Available control of caching bytecode and full access to [ICommand](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Actions/ICommand.cs) & [ISolutionEvent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Events/ISolutionEvent.cs) (can be cast [on similars](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Events/))*

# Default Entry point

{% highlight csharp %}

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
{% endhighlight %}

# Compiler settings

## References

Additional assembly names that are referenced by the source to compile. You can use any formats below, for example:

{% highlight bat %}

EnvDTE.dll
C:\WINDOWS\assembly\GAC\EnvDTE\<ver>\EnvDTE.dll
EnvDTE
EnvDTE, Version=8.0.0.0, PublicKeyToken=b03f5f7f11d50a3a
{% endhighlight %}

## FilesMode flag

As variant, you can also use FilesMode flag in Compiler settings for work with external source codes.

Then you should use list of files instead of code, for example:

{% highlight bat %}

hooks\*.cs
scripts\vssbe\main.cs
scripts\vssbe\ftp.cs
D:\app\scripts\*.*
{% endhighlight %}
etc.

So you can also add this in your solution for more productive work, for example:

![Build Scripts for C# Mode](../../Resources/examples/csharp_FilesMode_flag.png)

*Note: In most cases the `Build Action` should be as `None`*

# Examples

See our source code for more details about [ICommand](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Actions/ICommand.cs) & [ISolutionEvent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Events/ISolutionEvent.cs).

## Write to VS Output window pane through vsSBE

*Of course you can also prepare [OutputWindow](https://msdn.microsoft.com/en-us/library/envdte.outputwindow.aspx) with [DTE2](https://msdn.microsoft.com/en-us/library/envdte80.dte2.aspx) etc.*

* Activate C# Mode
* Add **'EnvDTE.dll'** reference in `Compiler` - `References`
* Customize cache and check other available flags of optimization. (optional)
* Use next code, for example:

{% highlight csharp %}

using net.r_eg.vsSBE;
using ICommand = net.r_eg.vsSBE.Actions.ICommand;
using ISolutionEvent = net.r_eg.vsSBE.Events.ISolutionEvent;

namespace vsSolutionBuildEvent
{
    public class CSharpMode
    {
        public static int Init(ICommand cmd, ISolutionEvent evt)
        {
            IOW pane = cmd.Env.OutputWindowPane;
            pane.getByName("Custom Name", true).OutputString(" Hello World! ");
            
            return 0;
        }
    }
}
{% endhighlight %}

* Activate Event and click Apply.
* Enjoy!

## FTP. Upload Artefacts and similar

* Activate C# Mode
* Add **'System.dll'** reference in `Compiler` - `References`
* Customize cache and check other available flags of optimization. (optional)
* Use next code, for example:

{% highlight csharp %}

using System;
using System.Net;
using ICommand = net.r_eg.vsSBE.Actions.ICommand;
using ISolutionEvent = net.r_eg.vsSBE.Events.ISolutionEvent;

namespace vsSolutionBuildEvent
{
    public class CSharpMode
    {
        public static int Init(ICommand cmd, ISolutionEvent evt)
        {
            _Ftp ftp = new _Ftp("192.168.17.04:2021");
            try {
                ftp.upload("Hello World!", "result.log");
                //ftp.upload(System.IO.File.ReadAllBytes("bin/rel/artefact.data"), "01.data");
            }
            catch {
                return 202;
            }
            return 0;
        }
        
        private class _Ftp
        {
            protected WebClient client;
            protected string server;
    
            public void upload(string data, string to)
            {
                client.UploadString(server + to, data);
            }
    
            public void upload(byte[] data, string to)
            {
                client.UploadData(server + to, data);
            }
    
            public _Ftp(string server, string user = "anonymous", string pass = "")
            {
                client = new WebClient() {
                    Credentials = new NetworkCredential(user, pass)
                };
                this.server = String.Format("ftp://{0}/", server);
            }
        }
    }
}
{% endhighlight %}

# References

* [Processing modes](../../Modes/)
* [Examples & Features](../../Examples/)
* [ICommand](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Actions/ICommand.cs) 
* [ISolutionEvent](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Events/ISolutionEvent.cs)
* [Actions/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Actions/)
* [Events/](https://bitbucket.org/3F/vssolutionbuildevent/src/master/vsSolutionBuildEvent/Events/)