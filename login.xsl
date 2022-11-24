<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Login</title>
                <style>
                    * {
                        box-sizing: border-box;
                        margin: 0;
                    }

                    body {
                        background: radial-gradient(#0d6efd,  #6610f2);
                    }

                    form {
                        display: flex;
                        flex-direction: column;
                        width: 50%;
                        margin: 0 auto;
                        text-align: center;
                        height: 100vh;
                        justify-content: center;
                    }

                    input {
                        padding: 20px;
                        font-size: 1.5em;
                        border-radius: 20px;
                        margin: 20px;
                        width: 80%;
                    }

                    a {
                        padding: 20px;
                        width: 50%;
                        align-self: center;
                        font-size: 1.8em;
                        margin: 20px;
                        font-family: cursive;
                        background-color: aquamarine;
                        border: 1px solid black;
                        text-decoration:none;
                        color:black;
                    }

                    div {
                        border: 5px dashed blanchedalmond;
                        padding: 20px;
                        background: #fefefea4;
                        box-shadow: 3px 3px 20px 2px gray;
                    }

                    h1 {
                        font-family: sans-serif;
                        font-size: 3em;
                    }

                </style>
            </head>

            <body>
                <form>
                    <div>
                        <h1>Login to mail</h1>
                        <xsl:for-each select="userlist/user">
                            <input type="text" placeholder="Username">
                                <xsl:attribute name="value">
                                    <xsl:value-of select="username" />
                                </xsl:attribute>
                            </input>

                            <input type="password" placeholder="Password">
                                <xsl:attribute name="value">
                                    <xsl:value-of select="pass" />
                                </xsl:attribute>
                            </input>
                        </xsl:for-each>
                        <br />
                        <br />
                        <a href="./temp.html">
                            Login
                        </a>
                        <br />
                        <br />
                    </div>
                </form>
            </body>

        </html>
    </xsl:template>
</xsl:stylesheet>