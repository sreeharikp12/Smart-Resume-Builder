def find_factors(n):
    """
    Find all factors of a number.
    
    Args:
        n (int): The number to find factors for
    
    Returns:
        list: A list of all factors of n
    """
    if n == 0:
        return None
    
    factors = []
    n_abs = abs(n)
    
    # Check all numbers from 1 to n
    for i in range(1, n_abs + 1):
        if n_abs % i == 0:
            factors.append(i)
    
    return factors


def main():
    """Main function to handle user input and display factors."""
    print("=" * 50)
    print("Factor Finder")
    print("=" * 50)
    
    try:
        # Get user input
        num = int(input("\nEnter an integer: "))
        
        # Find factors
        factors = find_factors(num)
        
        # Display result
        if factors is None:
            print(f"\nError: Zero has infinite factors.")
        else:
            print(f"\nThe factors of {num} are:")
            # Display factors in a formatted way
            print(", ".join(map(str, factors)))
            print(f"\nTotal number of factors: {len(factors)}")
            
    except ValueError:
        print("\nError: Please enter a valid integer.")
    except Exception as e:
        print(f"\nAn error occurred: {e}")


if __name__ == "__main__":
    main()

