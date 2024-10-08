<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'min:8',
                'confirmed',
                'regex:/[a-zA-Z]/',
                'regex:/[0-9]/',
                'regex:/[@$!%*?&]/'
            ],
            'date' => 'required|date|before:today',
            'gender' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Introdu prenumele',
            'surname.required' => 'Introdu numele',
            'email.required' => 'Introdu o adresă de email',
            'email.email' => 'Email invalid',
            'email.unique' => 'Email deja luat',
            'password.required' => 'Introdu parola',
            'password.min' => 'Parola e mai scurtă de 8 caractere',
            'password.confirmed' => 'Parolele nu se potrivesc',
            'password.regex' => 'Parola nu conține măcar un număr,o literă și un simbol',
            'date.required' => 'Introdu data nașterii',
            'date.date' => 'Dată invalidă',
            'date.before' => 'Data de naștere trebuie să fie înainte de azi',
            'gender.required' => 'Introdu genul'
        ];
    }
}
