# GENERAL KNOWLEDGE QUESTIONS

## 1. What are the key security considerations when developing financial applications?

Some key considerations when developing financial applications are as follows:

a. Data Encryption: Protect sensitive data both at rest (stored on servers) and in transit (moving between systems) using strong encryption algorithms.

b. Authentication and Authorization: Verify user identity (authentication) and control their access to specific features and data (authorization). Implement multi-factor authentication and least privilege principles.

c. Input Validation and Sanitization: Carefully examine and clean user inputs to prevent attacks like SQL injection and cross-site scripting.

d. Secure Coding Practices: Follow secure coding guidelines and conduct regular code reviews to identify and fix vulnerabilities.

e. Monitoring and Logging: Monitor system activity for unusual behavior and analyze logs to detect and respond to security incidents.




## 2. Describe the importance of compliance standards such as PCI-DSS and GDPR in financial applications.

i.  PCI-DSS:	Payment Card Industry Data Security Standard
ii. GDPR:	General Data Protection Regulation

Some importances of the two compliance standards above are:

### a.  Protecting Sensitive Data: 
   Ensures secure handling of payment card details (PCI-DSS) and personal data (GDPR) to prevent breaches and fraud.

### b.  Building Customer Trust
   Shows users their data is handled responsibly, fostering confidence in the application.

### c.  Avoiding Financial Penalties
   Non-compliance can lead to heavy fines

### d. Legal and Regulatory Obligations
   Ensures the application adheres to global and local laws for data security and privacy.

### e. Reducing Data Breach Risks
   Implements strong security measures like encryption, access control, and breach notifications.

### f. Enhancing System Security
Encourages secure development practices and continuous monitoring to prevent vulnerabilities.

### g. Global Interoperability
   Compliance ensures the app can operate legally across borders, especially in the EU and with global payment 
   systems.

### h. Competitive Advantage
   Demonstrates reliability and security, attracting more users and businesses.




## 3. Explain the concept of "idempotency" in financial transactions and why it's crucial.

   In computing and API design, idempotency means that repeating the same operation multiple times will produce the same result as doing it once. This is especially important in financial systems - if a payment request gets sent twice due to a network glitch or retry attempt, you want to ensure the customer only gets charged once, not multiple times.


## 4. Potential Risks of handling sensitive customer data

### a. Data Breaches
Unauthorized access to sensitive data (e.g., ATM numbers, User Login Password) due to weak security measures.
### b. Data Leakage
Accidental exposure of sensitive data through misconfigured databases, APIs, or logging systems.
### c. Insider Threats
Malicious or negligent actions by employees or contractors with access to sensitive data.
### d. Phishing and Social Engineering
Attackers tricking employees or customers into revealing sensitive information.
### e. Insecure APIs
Exploitation of vulnerabilities in APIs to gain unauthorized access to data.
### f. Compliance Violations
Failure to comply with regulations like GDPR, PCI-DSS, or CCPA, leading to legal penalties and loss of trust.
### g. Data Corruption or Loss
Accidental or malicious alteration or deletion of sensitive data.
### h. Third-Party Risks
Vulnerabilities in third-party services or vendors that handle sensitive data.
