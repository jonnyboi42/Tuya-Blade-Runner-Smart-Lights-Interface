

![IMG_0133](https://github.com/user-attachments/assets/af2d0ea4-8561-4997-8e6d-088e047c0058)



# Smart Lights Interface

This project is a **Smart Lights Interface** that utilizes **Tuya's API** to control smart light strips and bulbs. Inspired by the aesthetic of **Blade Runner**, this interface offers a unique and immersive experience for managing your smart lighting.

## Features
- Control Tuya-compatible smart light strips and bulbs.
- User-friendly interface inspired by Blade Runner's futuristic design.
- Open-source and available for anyone to use and contribute.

## Prerequisites
To get started with this project, you will need the following:

1. **Tuya Developer Account**: Create an account on the [Tuya Developer Platform](https://developer.tuya.com/en/) to access Tuya's API and configure your devices.
2. **Tuya Smart Light Strips or Bulbs**: Ensure you have Tuya-compatible smart lights set up in your account.

## Setting Up Your Tuya Account
Once your Tuya developer account is created, you will need to start a new cloud project. At this point, you can refer to a YouTube video https://www.youtube.com/watch?v=qVZJyHJsF9A&t=15s to learn how to find your device IDs. The device ID will be required for the config file in the **backend** folder. 

You will have a boilerplate `.env` file that contains this ID, as well as the Tuya secret key variable. I will update these boilerplates later.

## Frontend Setup
The frontend of this project is built using **React** and **Vite**. To run the frontend:

1. Navigate to the frontend directory in your terminal.
2. Make sure all necessary packages are installed by running:
   ```bash
   npm install
