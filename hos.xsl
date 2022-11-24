<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html lang="en">

            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>HMS</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
            </head>

            <body class="bg-primary">
                <nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
                    <div class="container-fluid">
                        <a href="./temp.html" class="navbar-brand">
                    Hospital Management System
                </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarText">
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" href="./hos.xml">Hospitals</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="./staff.xml">Staff</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="./patient.xml">Patients</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="./doctor.xml">Doctors</a>
                                </li>
                            </ul>
                            <a class="btn btn-outline-success" href="./login.xml">Logout</a>
                        </div>
                    </div>
                </nav>
                <div class="container">
                    <div class="position-absolute top-50 start-50 translate-middle w-50">
                        <table class="table table-dark table-hover table-bordered border-light">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="/hoslist/hos">
                                    <tr>
                                        <td>
                                            <xsl:value-of select="id" />
                                        </td>
                                        <td>
                                            <xsl:value-of select="name" />
                                        </td>
                                        <td>
                                            <xsl:value-of select="location" />
                                        </td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </div>
                </div>

            </body>

        </html>
    </xsl:template>
</xsl:stylesheet>