<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nicholas Pfeffer - Portfolio</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="./css/global.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.php">Nicholas Pfeffer</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#education">Education</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#publications">Publications</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#projects">Projects</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <div class="container-fluid hero-section text-white text-center py-5">
        <div class="container">
            <h1 class="display-4 fade-in-left mt-5 pt-5">Welcome to My Portfolio</h1>
            <p class="lead fade-in-right">Academic Researcher & Developer</p>
        </div>
    </div>

    <!-- Main Content Sections -->
    <div class="container mt-5">
        <!-- About Section -->
        <section id="about" class="mb-5">
            <h2>About Me</h2>
            <div class="row">
                <div class="col-md-12">
                    <p>Welcome to my academic portfolio. Here you'll find information about my research, publications, and academic accomplishments.</p>
                </div>
            </div>
        </section>

        <!-- Education Section -->
        <section id="education" class="mb-5">
            <h2>Education</h2>
            <div class="row">
                <div class="col-md-12">
                    <!-- Add your education details here -->
                </div>
            </div>
        </section>

        <!-- Publications Section -->
        <section id="publications" class="mb-5">
            <h2>Publications</h2>
            <div class="row">
                <div class="col-md-12">
                    <!-- Add your publications here -->
                </div>
            </div>
        </section>

        <!-- Projects Section -->
        <section id="projects" class="mb-5">
            <h2>Projects</h2>
            <div class="row">
                <div class="col-md-12">
                    <!-- Add your projects here -->
                </div>
            </div>
        </section>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3 mt-5">
        <div class="container">
            <p>&copy; <?php echo date("Y"); ?> Nicholas Pfeffer. All rights reserved.</p>
        </div>
    </footer>

    <!-- Bootstrap JS and dependencies -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 