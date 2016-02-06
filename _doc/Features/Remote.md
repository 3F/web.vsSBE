---
layout: doc
title: Remote servers
permalink: /doc/Features/Remote/
---
# Remote servers

For work with remote servers you can use any available variants from [available modes](../../Modes/)

{% assign infoData = "[v0.12.6+](/Changelist/) is already contains features for work with remote servers. Use [FileComponent](../../Scripts/SBE-Scripts/Components/FileComponent/#remote)" %}
{% include elem/info %}

# FTP

## - C# Mode

* [Upload Artefacts and similar](../../Modes/CSharp/#ftp-upload-artefacts-and-similar)
    * Activate C# Mode
    * Add **'System.dll'** reference in `Compiler` - `References`
    * Customize cache and check other available flags of optimization. (optional)
    * Use next code, for example:

```csharp
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
```

## - Targets Mode

## - Script Mode

## - Interpreter Mode


# References

* [Examples & Features](../../Examples/)
* [Processing modes](../../Modes/)