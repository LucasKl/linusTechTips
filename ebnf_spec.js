let spec=`<bSentence> ::= 
"Dürfen wir für "<aufgabe>" auch "<bTech>" verwenden?" |
"Gibt es auch ein buildscript für "<bOS>"?" |
"So nervig, in "<bLang>" ginge das viel easier." |
"So was habe ich auch mal in "<bLang>" implementiert." |
"Man kann für "<aufgabe>" anstatt "<baseType>" besser "<complexType>" benutzen." |
"Bekommt man Bonuspunkte, wenn man für "<aufgabe>" "<complexType>" verwendet?" |
"Gibt es für "<bLang>" auch ein Plugin für "<bTech>"?" |
<zeit>" habe ich einen Mod für "<gamez>" in "<bLang>" geproggt." |
"Ich finde ja "<framework>" 2 ist besser als "<framework>" 3." |
"Ich wollte "<complexType>" in "<bLang>" mit "<framework>" implementieren, bin aber noch nicht ganz fertig." |
"Ich habe bei "<techSite>" einen Kompiler von "<bLang>" nach "<bLang>" gefunden. Den möchte ich für "<aufgabe>" benutzen." |
"Ich habe bei "<techSite>" in den Kommentaren die Lösung für "<aufgabe>" gefunden." |
"Ich habe bei "<techSite>" in den Kommentaren die Lösung für "<aufgabe>" in "<bTech>" gefunden." |
"Ich habe bei "<techSite>" in den Kommentaren die Lösung für "<aufgabe>" in "<bTech>" mit "<complexType>" gefunden." |
"Bringst du mir noch "<food>" und "<drink>" vom Automaten mit?" |
"Hat jemand "<gamez>" auf USB?" |
"Hat jemand "<gamez>" auf "<bOS>" zum laufen gebracht?" |
"Läuft "<gamez>" auf deinem "<bOS>"? Hab auf "<techSite>" gelesen, dass es funzen soll." |
"Hab meiner Mutter "<bOS>" auf ihrem Netbook installiert. Anscheinend habe ich einen DAU in der Familie. ROFL!" |
"Ich sauge mir ebend die neue Folge von "<anime>"." |
"Ich habe in der letzten Vorlesung "<complexType>" nicht ganz verstanden, aber in "<bLang>" mit "<bTech>" brauch ichs eh nicht." |
"Ich finde "<brand>" besser als "<brand>" weil die Unterstützung für "<bTech>" besser ist." |
"Ich schlage vor wir benutzen "<cloud>" anstatt git für die Übungszettel" |
"Wer kennt "<chatservice>"? Suche ne neue community für "<gamez>".";

<brand> ::= "Apple" | "Lenovo" | "Alienware" | "Razer" | "Microsoft" | "Burger King" | "KFC" | "SUSE" | "Blizzard" | "Riot";
<serie> ::= "Game of Thrones" | "Yu-Gi-Oh" | "Naruto";
<techSite> ::= "golem" | "heise" | "chip.de" | "Computer Bild" | "4chan" | "9gag" | "Fefes Blog" | "StackOverflow" | "Twitch" | "w3c schools" | "reddit" | "gutefrage.net";
<bLang> ::= "perl" | "javascript" | "vb.net" | "processing" | "erlang" | "scheme" | "visual basic" |"LaTeX" | "excel" | "php" | "powershell" | "Pascal" | "c" | "c++" | "haskell";
<bTech> ::= "framework" | "intelli J" | "blue J"  | "regex" | "php storm" | "vim" | "emacs" | "NFC";
<bOS> ::= "Ubuntu" | "Arch" | "Gentoo" | "Backtrack Linux" | "FreeBSD" | "OpenBSD";
<gamez> ::= "LoL" | "Dota" | "Overwatch" | "Heartstone" | "CS:GO" | "Minecraft" | "Fortnite" | "PUBG" | "Rocket Leauge" | "Minesweeper" | "WoW" | "Super Smash Bros" | "O-Game" | "Die Stämme" | "Sakura Beach";
<aufgabe> ::= "Übungsblatt 1" | "Übungsblatt 3" | "Übungsblatt 5" | "das extra Übungsblatt" | "Übungsblatt 0";
<baseType> ::= "Boolean" | "int" | "float" | "String";
<complexType> ::= "Rot-Schwarz-Baume" | "Regex" | "Binärbaume" | "Ringbuffer" | "Einfach-Verkettete-Liste" | "Algebraischen Datentypen" | "DLL";
<zeit> ::= "Letzte Woche" | "Gestern Nacht" | "Letztes Wochenende" | "Damals in der 10ten" | "Im ersten Semester" | "Bei der letzten ONOC" | "In den Semesterferien";
<jsFrameworkName> ::= "node" | "jquery" | "javapoly" | "react" | "redux" | "ember" | "browserify" | "bootstrap" | "handle-bar" | "mustache" | "require" | "beefy";
<jsFramework> ::= <jsFrameworkName>".js";
<framework> ::= "spring" | <jsFramework> | "primefaces" | "template haskell" | "spray" | "akka" | "couchDB" | "ElasticSearch" | "wordpress" | "MariaDB" | "MongoDB";
<food> ::= "Bifi" | "Bifi-Roll" | "Carazza" | "Doritos" | "Pizza";
<fritzProdukt> ::= "kola" | "melone" | "kaffe kola" | "orange" | "misch-masch" | "mate";
<drink> ::= "Matcha" | "Club Mate" | "Club Mate Granat" | "Fritz" <fritzProdukt> | "kaffee" | "Frappochino";
<cloud> ::= "owncloud" | "dropbox" | "Google Drive" | "Seafile" | "Telegram File Upload" | "iCloud";
<chatservice> ::= "nen nicen Discord" | "l33te Telegram Gruppen" | "dope Slack Channelz" | "dope Mattermost Channelz" | "nice subreddits";`
