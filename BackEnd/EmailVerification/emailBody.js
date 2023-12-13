const html = (username, code) => {
    return (
        `<html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
        
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
        
                .header {
                    background-color: #3498db;
                    padding: 20px;
                    color: #ffffff;
                    text-align: center;
                }
        
                .body {
                    padding: 20px;
                }
        
                .main-message {
                    font-size: 18px;
                    color: #333333;
                    line-height: 1.6;
                }
        
                .cta-button {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #2ecc71;
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: bold;
                    border-radius: 5px;
                }
        
                .footer {
                    text-align: center;
                    padding: 20px;
                    background-color: #3498db;
                    color: #ffffff;
                }
            </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Welcome in A. Let's enjoy</h1>
            </div>
            <div class="body">
              <p class="main-message">Dear ${username},</p>
              <p class="main-message">Thank you for being a part of our community. We have exciting news to share with you!</p>
              <p class="main-message">This is a verification Email and this is your code <b>${code}</b></p>
            </div>
            <div class="footer">
              <p>By A.</p>
            </div>
          </div>
        </body>
        </html>`
    )
}

module.exports = html;