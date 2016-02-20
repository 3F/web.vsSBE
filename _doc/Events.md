---
layout: doc
title: Available Events
permalink: /doc/Events/
---
# Available Events

* **Pre-Build** - Before build.
* **Post-Build** - After build.
* **Cancel-Build** - by user or when occurs error.
* **[CommandEvent (DTE)](../Events/CommandEvent/)** - The Command Events from EnvDTE.
* **Warnings-Build** - Warnings during assembly processing.
* **Errors-Build** - Errors during assembly processing.
* **Output-Build** - Customization and full control by using listener.
* **[Sln-Opened](../Events/SlnOpened/)** - When solution has been opened.
* **Sln-Closed** - When solution has been closed.
* **Transmitter** - Transmission of the build-data to outer handler.
* **Logging** - All processes with internal logging.

{% include elem/fillme %}

## Beyond of the solution level

Use the [vsCommandEvent](http://vsce.r-eg.net)

# References

* [Processing modes](../Modes/)
* [Examples & Features](../Examples/)