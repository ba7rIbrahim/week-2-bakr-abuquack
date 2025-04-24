package utils

import (
	"net/http"

	"github.com/ba7rIbrahim/week-2-bakr-abuquack/models"
	"github.com/ba7rIbrahim/week-2-bakr-abuquack/types"
)

func GetUser(r *http.Request) *models.User {
	if user, ok := r.Context().Value(types.UserKey).(*models.User); ok {
		return user
	}
	return nil
}
