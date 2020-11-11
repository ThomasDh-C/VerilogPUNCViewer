# Verilog Simon Lab Viewer
A visualiser for VCD files produced by the Icarus Verilog compiler.
To be used in conjunction with Simon Lab of Princeton's ELE206 course.

![App screenshot](https://github.com/ThomasDh-C/VerilogSimonViewer/blob/master/readme_imgs/readme.png)

## Getting Started
To run the development server:
npm install
npm run dev

Open [http://localhost:3000](http://localhost:3000) 

## Structure
This project is built using the React framework Next.js.
General styling is implemented by Next.js css file, components are individually styled with styled-components.
Verilog parsing is implented with the [vcd-parser package](https://github.com/ahmed-agiza/vcd-parser#readme)

Index.tsx manages all the components as this is a one-page web-app.

## Issues
If any issues are found, submit an issue.