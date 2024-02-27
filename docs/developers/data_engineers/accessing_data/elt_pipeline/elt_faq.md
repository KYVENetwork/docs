---
sidebar_position: 4
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# FAQ

## DNS Resolution Error - `Failed to resolve 'arweave.net'`

**Issue:** When running the ELT process, you encounter the following error message:

```sh
urllib3.exceptions.MaxRetryError: [...]: 
Max retries exceeded with url: /7iN4ABrn4Mh8GMQBmryq_5AsC9VuKgyggcr5ZJ1sgEk ([...] Failed to resolve 'arweave.net'))
```

This error is most likely due to DNS resolution issues.

**Solution:** To resolve DNS resolution errors, you can change your DNS server to use a more reliable option such as Cloudflare's `1.1.1.1` or Google's `8.8.8.8`. Here are instructions for changing the DNS server on different operating systems:

<Tabs>
<TabItem value="linux" label="Linux">
  
  <ol>
    <li>Open the terminal.</li>
    <li>Edit the `/etc/resolv.conf` file using your preferred text editor. For example:<pre><code>sudo nano /etc/resolv.conf</code></pre></li> 
    <li>Add the following lines at the top of the file to set your DNS server to `1.1.1.1`:<pre><code>nameserver 1.1.1.1</code></pre></li>
    <li>Save the file and exit the text editor.</li>
    <li>Restart your network manager or networking service to apply the changes. The command may vary depending on your Linux distribution. For example:<pre><code>sudo systemctl restart network-manager</code></pre></li>
  </ol>

</TabItem>
<TabItem value="mac" label="Mac">

  <ol>
    <li>Open the "System Preferences" from the Apple menu.</li>
    <li>Click on "Network."</li>
    <li>Select your active network connection (Wi-Fi or Ethernet).</li>
    <li>Click the "Advanced" button.</li>
    <li>Go to the "DNS" tab.</li>
    <li>In the "DNS Servers" section, click the "+" button and add <code>1.1.1.1</code> or <code>8.8.8.8</code>.</li>
    <li>Click "OK" and then "Apply" to save the changes.</li>
  </ol>

</TabItem>
<TabItem value="windows" label="Windows">

  <ol>
    <li>Open the "Control Panel."</li>
    <li>Click on "Network and Sharing Center."</li>
    <li>Click on your active network connection.</li>
    <li>Click "Properties."</li>
    <li>Select "Internet Protocol Version 4 (TCP/IPv4)" and click "Properties."</li>
    <li>Choose "Use the following DNS server addresses."</li>
    <li>Enter <code>1.1.1.1</code> as the preferred DNS server or <code>8.8.8.8</code> as an alternative DNS server.</li>
    <li>Click "OK" to save the settings.</li>
  </ol>

</TabItem>
</Tabs>

**Note:** After changing your DNS server, you may need to restart your network connection or computer to apply the new settings.

**More Information:** If you continue to experience issues after changing your DNS server, please check your network configuration and ensure that your internet connection is stable.
