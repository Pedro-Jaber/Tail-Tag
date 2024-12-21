# Tail Tag

Tail Tag is a smart pet tracking service designed to ensure the safety and well-being of your pets. Equipped with a wearable collar featuring real-time geolocation and health monitoring sensors, it allows pet owners to monitor their pets' location and health status through a user-friendly web interface.

## Features

- **Real-Time Geolocation**: Track your pet's location in real-time to ensure their safety.
- **Health Monitoring**: Monitor vital health metrics to keep your pet healthy.
- **User-Friendly Interface**: Access all features through an intuitive web application.

## Installation

To set up the Tail Tag application locally, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Pedro-Jaber/Tail-Tag.git
   cd Tail-Tag
   ```

2. **Install Dependencies**:

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the root directory based on the `.env.example` file, configuring the necessary environment variables.

4. **Run the Application**:

   Start the development server with:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:5505`.

## Usage

After setting up the application:

1. **Access the Web Interface**: Navigate to `http://localhost:5505` in your browser.
2. **Register Your Pet**: Create a profile for your pet, including necessary details.
3. **Monitor in Real-Time**: View your pet's location and health metrics on the dashboard.
   ![](https://github.com/Pedro-Jaber/Tail-Tag/blob/main/public/Demo/tailtag-demo.gif?raw=true)

## Contributing

We welcome contributions to enhance Tail Tag. To contribute:

1. **Fork the Repository**: Click the 'Fork' button on the GitHub page.
2. **Create a New Branch**: For your feature or bug fix.

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes**: Write clear and concise commit messages using `Conventional Commits`

   ```
   <type>[optional scope]: <description>

   [optional body]

   [optional footer(s)]
   ```
   For more details about Conventional Commits, visit [Conventional Commits](https://www.conventionalcommits.org/).

4. **Push to Your Branch**:

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Submit a Pull Request**: Describe your changes and submit for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue on the [GitHub repository](https://github.com/Pedro-Jaber/Tail-Tag/issues).

---

*Note: This project is for educational purposes and may not be suitable for production use without further development and testing.*

