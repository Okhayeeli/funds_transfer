# GENERAL KNOWLEDGE QUESTIONS

## 1. What are the key security considerations when developing financial applications?

Some key considerations when developing financial applications are as follows:

### a. Data Encryption: 
Protect sensitive data both at rest (stored on servers) and in transit (moving between systems) using strong encryption algorithms.

### b. Authentication and Authorization: 
Verify user identity (authentication) and control their access to specific features and data (authorization). Implement multi-factor authentication and least privilege principles.

### c. Input Validation and Sanitization: 
Carefully examine and clean user inputs to prevent attacks like SQL injection and cross-site scripting.

### d. Secure Coding Practices: 
Follow secure coding guidelines and conduct regular code reviews to identify and fix vulnerabilities.

### e. Monitoring and Logging: 
Monitor system activity for unusual behavior and analyze logs to detect and respond to security incidents.




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






# Backend Development Theoretical Questions

## 1. Explain the importance of ACID properties in financial applications and how they apply to databases.

ACID stands for:

A	-	Atomicity, 
C	-	Consistency, 
I	-	Isolation, 
D	-	Durability


### These are fundamental principles for database transactions, ensuring data integrity and reliability. 
Some importance of ACID are:

i.   Data Integrity: Prevents errors like double-charging or lost transactions.
ii.  Trust: Users rely on financial systems for accurate and reliable results.
iii. Compliance: Meets regulatory standards for secure and reliable data handling.
iv.  Scalability: Maintains accuracy even as transaction volumes increase.



### How they affect financial databases:

Atomicity: Ensures transactions are all-or-nothing, preventing partial updates (e.g., both debit and credit must either succeed or fail).
Consistency: Maintains valid database states by enforcing rules like no negative balances.
Isolation: Ensures concurrent transactions don’t interfere, avoiding data conflicts.
Durability: Guarantees committed transactions are permanent, even after system failures.




## 2. What is the role of encryption in securing bank transactions?

i.   Data Protection During Transmission
ii.  Prevents Data Interception
iii. Ensures Data Integrity
iv.  Secure Storage of Sensitive Information
v.   Authentication and Authorization
vi.  Compliance with Regulations




## 3. Describe how you would implement a secure login system using JWT tokens.


### a. User Login

i.   The user enters their username and password.
ii.  The system checks the credentials. If correct, a JWT (JSON Web Token) is created.


### b. Token Generation

i.   The server generates a JWT token, which is a string that contains encrypted information (like the user's ID and roles).
ii.  This token is sent back to the user.


### c. Token Storage
i. The user’s app (web or mobile) stores the token (usually in localStorage or cookies).


### d. Using the Token
i. For every future request, the user sends the JWT token along with the request.
ii. The server checks the token to verify the user’s identity before granting access.

### e. Token Expiry and Refresh
i. The token has an expiration time to enhance security. If the token expires, the user needs to log in again or use a refresh token to get a new one.





## 4. How would you handle concurrent transactions to prevent double spending or data inconsistencies?

### Definitions:
Concurrent transactions occur when multiple transactions are executed simultaneously in a database system. This is common in multi-user systems where many operations, such as withdrawals, deposits, or updates, are performed at the same time.

Double spending happens when the same funds are used more than once for transactions due to improper handling of concurrency.
Errors in database states caused by transactions interfering with each other.


### Handling Concurrent Transactions

#### a. Use of Database Isolation Levels
Implement appropriate isolation levels to manage concurrent access:
i. Repeatable Read: Prevents modifications to data being read by a transaction until it’s complete, avoiding double spending.
ii. Read Committed: Ensures only committed data is read, reducing dirty reads.

#### b. Optimistic Locking
i. Check if the data has changed since it was read by the transaction (using a version number or timestamp) before applying updates.
ii. Prevents overwriting changes made by another transaction.

#### c. Pessimistic Locking

i. Lock records or rows being used by a transaction to prevent others from accessing or modifying them until the transaction completes.
ii. Suitable for high-risk operations like fund transfers.

#### d. Atomic Operations
i. Use atomic database transactions to ensure multiple operations (e.g., debit and credit) are processed as a single unit.

#### e. Concurrency Control Mechanisms
i. Use two-phase commit (2PC) for distributed transactions to maintain consistency across multiple systems.
ii. Leverage multiversion concurrency control (MVCC) to allow multiple transactions while maintaining data consistency.

#### f. Unique Constraints
i. Enforce database constraints (e.g., unique transaction IDs) to prevent duplicate transactions.




# PRACTICAL TASK
## 1. Optimize the following SQL query for a microfinance bank's customer records:
SELECT * FROM transactions WHERE customer_id = '12345' ORDER BY date DESC;

At first glance, this is a straight forward query, but there are ways to optimize it for better design:
### 1. Identify the Needed Columns: 
This would only retrieve necessary data, reduce data transfer and improve query speed.

Example:
SELECT transaction_id, amount, transaction_type, date 
FROM transactions 
WHERE customer_id = '12345' 
ORDER BY date DESC;


### 2. Consider Indexing: 
This allows the database to quickly locate rows with the specified customer_id, significantly speeding up the WHERE clause execution. Without an index, the database would need to scan the entire table to find matching records, which can be extremely slow for large datasets.

Example:
CREATE INDEX idx_customer_id ON transactions (customer_id);


### 3. Limit the Result Set:
If you only need to retrieve the most recent transactions, use the LIMIT clause to restrict the number of rows returned.

Example:
SELECT transaction_id, amount, transaction_type, date 
FROM transactions 
WHERE customer_id = '12345' 
ORDER BY date DESC 
LIMIT 100;



