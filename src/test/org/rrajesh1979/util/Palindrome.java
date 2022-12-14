package org.rrajesh1979.util;

/*
This segment of code is a class named Palindrome, and contains one method, isPalindrome.
The isPalindrome method takes a String as an argument and checks if the String is a palindrome.
It does this by creating a new String, rev, that is initialized as an empty String.
It then iterates through the inputString argument, starting at the last character, and adds each character to the rev String.
After the loop is complete, it checks if the inputString is equal to the rev String.
If the two Strings are equal, the method returns true, otherwise it returns false.
*/
public class Palindrome {
    public static boolean isPalindrome(String inputString) {
        return inputString.equals(
                inputString.chars()
                        .mapToObj(i -> Character.toString((char) i))
                        .reduce("", (rev, ch) -> ch + rev));
    }
}
