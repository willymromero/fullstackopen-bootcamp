```mermaid
sequenceDiagram
    User->Browser: Go to https://studies.cs.helsinki.fi/exampleapp/notes
    Server<->Browser: Load web page content
    Browser->User: Show web page ready
    note over User:
    User writes new
    note and submit form.
    end note
    User->Browser: Type new note on input file and click on "save"
    Browser->Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Server->Server: Store note
    note left of Server:
    Server Store the new note
    (it shouldn't care for now).
    end note
    Browser->Browser: Reload content
    Server<->Browser: Load web page content
```
