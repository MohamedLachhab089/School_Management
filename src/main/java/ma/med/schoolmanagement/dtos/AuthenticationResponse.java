package ma.med.schoolmanagement.dtos;

import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwtToken;

    public AuthenticationResponse(String jwt) {
        this.jwtToken = jwt;
    }
}
