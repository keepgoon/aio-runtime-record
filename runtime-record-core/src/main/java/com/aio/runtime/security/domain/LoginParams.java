package com.aio.runtime.security.domain;

import lombok.Data;

/**
 * @author lizhenming
 * @desc:
 * @date 2022/12/9 22:51
 */
@Data
public class LoginParams {
    private String password;
    private String username;
}
