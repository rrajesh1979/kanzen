// package org.rrajesh1979.palindrome;

//Java function to check if a string is a palindrome or not

public class Palindrome {
    public static boolean isPalindrome(String inputString) {
        String rev = "";
        for (int i = inputString.length() - 1; i >= 0; i--) {
            rev = rev + inputString.charAt(i);
        }
        return inputString.equals(rev);
    }

    public static void main(String[] args) {
        String inputString = "racecar";
        if (isPalindrome(inputString)) {
            System.out.println(inputString + " is a Palindrome");
        } else {
            System.out.println(inputString + " is not a Palindrome");
        }

        inputString = "dog";
        if (isPalindrome(inputString)) {
            System.out.println(inputString + " is a Palindrome");
        } else {
            System.out.println(inputString + " is not a Palindrome");
        }
    }
}