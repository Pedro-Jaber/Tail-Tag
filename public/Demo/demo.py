import time
import requests

# Constants
API_URL = "http://localhost:5505/api/collar"
SERIAL_NUMBER = "T-XRC-362-K2"
TXT_FILE_PATH = "nmea-demo.txt"  # Replace with your file path
POST_INTERVAL = 5  # Time interval in seconds


def post_gpgga_data(serial_number, gpgga_data):
    """
    Sends an HTTP POST request with the given serial number and GPGGA data.
    """
    payload = {"serialNumber": serial_number, "$GPGGA": gpgga_data}
    try:
        response = requests.post(API_URL, json=payload)
        print(f"POST Response [{response.status_code}]: {response.text}")
    except requests.RequestException as e:
        print(f"Error during POST request: {e}")


def main():
    try:
        with open(TXT_FILE_PATH, "r") as file:
            # Read the file line by line
            for line in file:
                gpgga_data = line.strip()  # Remove whitespace and newlines
                if not gpgga_data:
                    continue  # Skip empty lines
                # Post the data
                print(f"Sending data: {gpgga_data}")
                post_gpgga_data(SERIAL_NUMBER, gpgga_data)
                # Wait for the next POST
                time.sleep(POST_INTERVAL)
    except FileNotFoundError:
        print(f"Error: File '{TXT_FILE_PATH}' not found.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")


if __name__ == "__main__":
    while True:
        main()
