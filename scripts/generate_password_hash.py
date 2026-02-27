#!/usr/bin/env python3
"""
Password Hash Generator for Markata Password Protection Plugin

This script generates secure SHA-256 password hashes with salt for use with
the password protection plugin.

Usage:
    python scripts/generate_password_hash.py
    python scripts/generate_password_hash.py --password "your_password" --salt "your_salt"
"""

import hashlib
import argparse
import getpass
import sys


def generate_hash(password: str, salt: str = "blog_salt_2025") -> str:
    """Generate SHA-256 hash of password with salt."""
    combined = password + salt
    return hashlib.sha256(combined.encode('utf-8')).hexdigest()


def main():
    parser = argparse.ArgumentParser(
        description="Generate password hash for Markata password protection"
    )
    parser.add_argument(
        "--password", 
        help="Password to hash (will prompt securely if not provided)"
    )
    parser.add_argument(
        "--salt", 
        default="blog_salt_2025",
        help="Salt for hashing (default: blog_salt_2025)"
    )
    parser.add_argument(
        "--config", 
        action="store_true",
        help="Output in markata.toml config format"
    )
    
    args = parser.parse_args()
    
    # Get password
    if args.password:
        password = args.password
    else:
        password = getpass.getpass("Enter password to hash: ")
        
    if not password:
        print("Error: Password cannot be empty", file=sys.stderr)
        sys.exit(1)
    
    # Generate hash
    password_hash = generate_hash(password, args.salt)
    
    # Output results
    if args.config:
        print("\n# Add this to your markata.toml:")
        print("[markata.password_protection]")
        print(f'password_hash = "{password_hash}"')
        print(f'salt = "{args.salt}"')
    else:
        print(f"\nPassword: {password}")
        print(f"Salt: {args.salt}")
        print(f"Hash: {password_hash}")
        print("Update your markata.toml with:")
        print(f'password_hash = "{password_hash}"')


if __name__ == "__main__":
    main()
