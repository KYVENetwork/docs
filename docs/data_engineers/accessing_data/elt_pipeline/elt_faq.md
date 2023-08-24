---
sidebar_position: 4
---

# FAQ

## DNS Resolution Error - `Failed to resolve 'arweave.net'`

**Issue:** When running the ELT process, you encounter the following error message:

```sh
urllib3.exceptions.MaxRetryError: [...]: 
Max retries exceeded with url: /7iN4ABrn4Mh8GMQBmryq_5AsC9VuKgyggcr5ZJ1sgEk ([...] Failed to resolve 'arweave.net'))
```

This error is most likely due to DNS resolution issues.

**Solution:** To resolve DNS resolution errors, you can change your DNS server to use a more reliable option such as Cloudflare's `1.1.1.1` or Google's `8.8.8.8`. Here are instructions for changing the DNS server on different operating systems:

- **Linux:**
    1. Open the terminal.
    2. Edit the `/etc/resolv.conf` file using your preferred text editor. For example:

    ```bash
    sudo nano /etc/resolv.conf
    ```

    3. Add the following lines at the top of the file to set your DNS server to `1.1.1.1`:

    ``` bash
    nameserver 1.1.1.1
    ```

    4. Save the file and exit the text editor.
    5. Restart your network manager or networking service to apply the changes. The command may vary depending on your Linux distribution. For example:

    ```bash
        sudo systemctl restart network-manager
    ```

- **Mac:**
    1. Open the "System Preferences" from the Apple menu.
    2. Click on "Network."
    3. Select your active network connection (Wi-Fi or Ethernet).
    4. Click the "Advanced" button.
    5. Go to the "DNS" tab.
    6. In the "DNS Servers" section, click the "+" button and add `1.1.1.1` or `8.8.8.8`.
    7. Click "OK" and then "Apply" to save the changes.

- **Windows:**
    1. Open the "Control Panel."
    2. Click on "Network and Sharing Center."
    3. Click on your active network connection.
    4. Click "Properties."
    5. Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."
    6. Choose "Use the following DNS server addresses."
    7. Enter `1.1.1.1` as the preferred DNS server or `8.8.8.8` as an alternative DNS server.
    8. Click "OK" to save the settings.

**Note:** After changing your DNS server, you may need to restart your network connection or computer to apply the new settings.

**More Information:** If you continue to experience issues after changing your DNS server, please check your network configuration and ensure that your internet connection is stable.

