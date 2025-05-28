migrate -path db/migrations \
-database "postgres://vessel_user:vessel_pass@localhost:5432/vessel_db?sslmode=disable" \
up

curl -v -X POST http://localhost:8080/login \
-H "Content-Type: application/json" \
-d '{"email":"tech", "password":"1"}'

curl -v -X POST http://localhost:8080/login \
-H "Content-Type: application/json" \
-d '{"email":"captain", "password":"2"}'

curl -v http://localhost:8080/profile \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY2FwdGFpbiIsInN1YiI6ImJiYmJiYmJiLWJiYmItYmJiYi1iYmJiLWJiYmJiYmJiYmJiYiIsImV4cCI6MTc0ODg1OTQ3OCwiaWF0IjoxNzQ4MjU0Njc4fQ.8s5Mu13BRebfdDOqNDYA_hdgcqLtHYggUWB59Ti-E50"
