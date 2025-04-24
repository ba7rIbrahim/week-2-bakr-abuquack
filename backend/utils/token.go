package utils

import (
	"crypto/rand"
	"encoding/hex"
)

func GenerateToken(length int) string {
	bytes := make([]byte, length)
	_, err := rand.Read(bytes)
	if err != nil {
		panic(err)
	}

	return hex.EncodeToString(bytes)[:length]
}
