from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit-form', methods=['POST'])
def submit_form():
    data = request.form
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    
    # Here you would typically:
    # 1. Validate the data
    # 2. Save to database or send email
    # 3. Return a success/error response
    
    print(f"New message from {name} ({email}): {message}")
    
    return jsonify({'success': True, 'message': 'Thank you for your message!'})

if __name__ == '__main__':
    app.run(debug=True)